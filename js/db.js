/*!
 * Tourism Management System - data layer
 * -------------------------------------------------------------
 * Replaces the original PHP + MySQL back-end.
 * All data lives in the browser's localStorage (key: "tms_db_v1").
 * The first time the site is opened the database is filled from
 * js/seed.js (an export of the original tms.sql file).
 *
 * Everything is exposed through one global object:  TMS
 */
(function (global) {
  'use strict';

  var DB_KEY = 'tms_db_v1';
  var USER_SESSION_KEY = 'tms_user_session';
  var ADMIN_SESSION_KEY = 'tms_admin_session';
  var FLASH_KEY = 'tms_flash';

  /* ---------------------------------------------------------------
   * MD5 (the original project stored MD5 password hashes, so we keep
   * the same format - that way the passwords from the SQL dump work)
   * ------------------------------------------------------------- */
  function md5(str) {
    var utf = unescape(encodeURIComponent(String(str)));
    var n = utf.length, i, w = [];
    for (i = 0; i < n; i++) w[i >> 2] = (w[i >> 2] || 0) | (utf.charCodeAt(i) << ((i % 4) * 8));
    w[n >> 2] = (w[n >> 2] || 0) | (0x80 << ((n % 4) * 8));
    var total = (((n + 8) >>> 6) + 1) * 16;
    for (i = 0; i < total; i++) w[i] = w[i] || 0;
    w[total - 2] = n * 8;
    var S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
    var T = [];
    for (i = 0; i < 64; i++) T[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) | 0;
    var a0 = 0x67452301, b0 = 0xefcdab89 | 0, c0 = 0x98badcfe | 0, d0 = 0x10325476;
    for (var o = 0; o < total; o += 16) {
      var A = a0, B = b0, C = c0, D = d0, F, g;
      for (i = 0; i < 64; i++) {
        if (i < 16) { F = (B & C) | (~B & D); g = i; }
        else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
        else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
        else { F = C ^ (B | ~D); g = (7 * i) % 16; }
        F = (F + A + T[i] + w[o + g]) | 0;
        A = D; D = C; C = B;
        var s = S[(i >> 4) * 4 + (i % 4)];
        B = (B + ((F << s) | (F >>> (32 - s)))) | 0;
      }
      a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
    }
    var hex = '';
    [a0, b0, c0, d0].forEach(function (x) {
      for (var j = 0; j < 4; j++) hex += ('0' + ((x >>> (j * 8)) & 255).toString(16)).slice(-2);
    });
    return hex;
  }

  /* ---------------------------------------------------------------
   * Small helpers
   * ------------------------------------------------------------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  // "2025-11-05 06:25:07" - the same format MySQL timestamps had
  function now() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' +
      pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }

  function ymd(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }

  function addDays(days) {
    var d = new Date();
    d.setDate(d.getDate() + days);
    return ymd(d);
  }

  // whole days from today until the given YYYY-MM-DD date (negative = in the past)
  function daysUntil(dateStr) {
    var p = String(dateStr || '').split('-');
    if (p.length < 3) return NaN;
    var target = new Date(+p[0], +p[1] - 1, +p[2]);
    var t = new Date(); t = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    return Math.round((target - t) / 86400000);
  }

  // htmlentities() equivalent - ALWAYS use this when printing user supplied data
  function esc(v) {
    if (v === null || v === undefined) return '';
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ---------------------------------------------------------------
   * Storage
   * ------------------------------------------------------------- */
  var memoryFallback = {};   // used only if localStorage is blocked by the browser

  function lsGet(k) {
    try { return global.localStorage.getItem(k); } catch (e) { return memoryFallback[k] || null; }
  }
  function lsSet(k, v) {
    try { global.localStorage.setItem(k, v); }
    catch (e) {
      if (e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014)) {
        throw new Error('Browser storage is full. Please use a smaller image or delete some data.');
      }
      memoryFallback[k] = v;
    }
  }
  function lsDel(k) {
    try { global.localStorage.removeItem(k); } catch (e) { delete memoryFallback[k]; }
  }

  var AUTO_INC = { admin: 2, tblbooking: 4, tblenquiry: 3, tblissues: 3, tblpages: 22, tbltourpackages: 11, tblusers: 14 };

  function buildSeed() {
    var seed = clone(global.TMS_SEED || {});
    var db = {
      admin: seed.admin || [],
      tblusers: seed.tblusers || [],
      tbltourpackages: seed.tbltourpackages || [],
      tblbooking: seed.tblbooking || [],
      tblenquiry: seed.tblenquiry || [],
      tblissues: seed.tblissues || [],
      tblpages: seed.tblpages || [],
      _ai: clone(AUTO_INC)
    };
    // The dump's sample trips are from 2025, so move them to the near future.
    // (that way the "Cancel" button of the demo bookings keeps working)
    var offsets = [10, 25, 40];
    db.tblbooking.forEach(function (b, i) {
      var from = new Date(b.FromDate), to = new Date(b.ToDate);
      var span = Math.round((to - from) / 86400000) || 5;
      b.FromDate = addDays(offsets[i % offsets.length]);
      b.ToDate = addDays(offsets[i % offsets.length] + span);
    });
    return db;
  }

  var cache = null;

  function load() {
    if (cache) return cache;
    var raw = lsGet(DB_KEY);
    if (raw) {
      try { cache = JSON.parse(raw); } catch (e) { cache = null; }
    }
    if (!cache) {
      cache = buildSeed();
      lsSet(DB_KEY, JSON.stringify(cache));
    }
    return cache;
  }

  function save() {
    lsSet(DB_KEY, JSON.stringify(cache));
  }

  // Always re-read before a write so two open tabs (user site + admin site) never overwrite each other.
  function fresh() { cache = null; return load(); }

  function nextId(db, table) {
    var id = db._ai[table] || 1;
    db._ai[table] = id + 1;
    return id;
  }

  /* ---------------------------------------------------------------
   * Session + flash message helpers
   * ------------------------------------------------------------- */
  var Session = {
    user: function () { return lsGet(USER_SESSION_KEY) || null; },
    admin: function () { return lsGet(ADMIN_SESSION_KEY) || null; }
  };

  function setFlash(msg) { try { global.sessionStorage.setItem(FLASH_KEY, msg); } catch (e) { memoryFallback[FLASH_KEY] = msg; } }
  function getFlash() {
    try { return global.sessionStorage.getItem(FLASH_KEY) || ''; } catch (e) { return memoryFallback[FLASH_KEY] || ''; }
  }

  /* ---------------------------------------------------------------
   * Public API
   * ------------------------------------------------------------- */
  var TMS = {
    md5: md5, now: now, esc: esc, ymd: ymd, daysUntil: daysUntil,
    setFlash: setFlash, getFlash: getFlash,

    /* ---------- generic ---------- */
    reset: function () {
      cache = buildSeed();
      lsSet(DB_KEY, JSON.stringify(cache));
    },
    exportJSON: function () { return JSON.stringify(load(), null, 2); },
    importJSON: function (text) {
      var data = JSON.parse(text);
      ['admin', 'tblusers', 'tbltourpackages', 'tblbooking', 'tblenquiry', 'tblissues', 'tblpages', '_ai'].forEach(function (k) {
        if (!data[k]) throw new Error('Invalid backup file (missing "' + k + '").');
      });
      cache = data; save();
    },

    /* ---------- images ---------- */
    // Package images are either a file name from admin/pacakgeimages/ (demo data)
    // or a base64 data-URL (images uploaded from the admin panel, kept in localStorage).
    imgSrc: function (name, base) {
      if (!name) return '';
      if (/^(data:|https?:|blob:)/i.test(name)) return name;
      return (base || '') + encodeURI(name);
    },
    // Resize an uploaded <input type=file> image and return a data-URL (Promise)
    fileToDataURL: function (file, maxWidth, quality) {
      return new Promise(function (resolve, reject) {
        if (!file) return reject(new Error('Please choose an image.'));
        if (!/^image\//.test(file.type)) return reject(new Error('Selected file is not an image.'));
        var fr = new FileReader();
        fr.onerror = function () { reject(new Error('Could not read the file.')); };
        fr.onload = function () {
          var img = new Image();
          img.onerror = function () { reject(new Error('Could not load the image.')); };
          img.onload = function () {
            var max = maxWidth || 900;
            var scale = Math.min(1, max / img.width);
            var c = document.createElement('canvas');
            c.width = Math.round(img.width * scale);
            c.height = Math.round(img.height * scale);
            var ctx = c.getContext('2d');
            ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
            ctx.drawImage(img, 0, 0, c.width, c.height);
            resolve(c.toDataURL('image/jpeg', quality || 0.82));
          };
          img.src = fr.result;
        };
        fr.readAsDataURL(file);
      });
    },

    /* =============================================================
     * USERS  (table tblusers)
     * =========================================================== */
    users: {
      all: function () { return clone(load().tblusers); },
      get: function (email) {
        var u = load().tblusers.filter(function (x) { return x.EmailId === email; })[0];
        return u ? clone(u) : null;
      },
      emailExists: function (email) {
        email = String(email || '').trim().toLowerCase();
        return load().tblusers.some(function (x) { return String(x.EmailId).toLowerCase() === email; });
      },
      register: function (o) {
        var db = fresh();
        var email = String(o.email || '').trim();
        if (db.tblusers.some(function (x) { return String(x.EmailId).toLowerCase() === email.toLowerCase(); })) {
          throw new Error('Email already exists.');
        }
        var id = nextId(db, 'tblusers');
        db.tblusers.push({
          id: id, FullName: o.fname, MobileNumber: o.mobile, EmailId: email,
          Password: md5(o.password), RegDate: now(), UpdationDate: null
        });
        save();
        return id;
      },
      login: function (email, password) {
        var hash = md5(password);
        var ok = load().tblusers.some(function (x) { return x.EmailId === email && x.Password === hash; });
        if (ok) lsSet(USER_SESSION_KEY, email);
        return ok;
      },
      logout: function () { lsDel(USER_SESSION_KEY); },
      current: function () { return Session.user(); },
      update: function (email, o) {
        var db = fresh();
        var u = db.tblusers.filter(function (x) { return x.EmailId === email; })[0];
        if (!u) return false;
        u.FullName = o.name; u.MobileNumber = o.mobile; u.UpdationDate = now();
        save(); return true;
      },
      changePassword: function (email, current, next) {
        var db = fresh();
        var u = db.tblusers.filter(function (x) { return x.EmailId === email && x.Password === md5(current); })[0];
        if (!u) return false;
        u.Password = md5(next); u.UpdationDate = now();
        save(); return true;
      },
      resetPassword: function (email, mobile, next) {
        var db = fresh();
        var u = db.tblusers.filter(function (x) { return x.EmailId === email && String(x.MobileNumber) === String(mobile); })[0];
        if (!u) return false;
        u.Password = md5(next); u.UpdationDate = now();
        save(); return true;
      }
    },

    /* =============================================================
     * PACKAGES  (table tbltourpackages)
     * =========================================================== */
    packages: {
      all: function () { return clone(load().tbltourpackages); },
      random: function (n) {
        var a = clone(load().tbltourpackages);
        for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
        return a.slice(0, n);
      },
      get: function (id) {
        id = parseInt(id, 10);
        var p = load().tbltourpackages.filter(function (x) { return x.PackageId === id; })[0];
        return p ? clone(p) : null;
      },
      create: function (o) {
        var db = fresh();
        var id = nextId(db, 'tbltourpackages');
        db.tbltourpackages.push({
          PackageId: id, PackageName: o.name, PackageType: o.type, PackageLocation: o.location,
          PackagePrice: parseInt(o.price, 10) || 0, PackageFetures: o.features, PackageDetails: o.details,
          PackageImage: o.image, Creationdate: now(), UpdationDate: null
        });
        save(); return id;
      },
      update: function (id, o) {
        var db = fresh();
        var p = db.tbltourpackages.filter(function (x) { return x.PackageId === parseInt(id, 10); })[0];
        if (!p) return false;
        p.PackageName = o.name; p.PackageType = o.type; p.PackageLocation = o.location;
        p.PackagePrice = parseInt(o.price, 10) || 0; p.PackageFetures = o.features; p.PackageDetails = o.details;
        p.UpdationDate = now();
        save(); return true;
      },
      setImage: function (id, image) {
        var db = fresh();
        var p = db.tbltourpackages.filter(function (x) { return x.PackageId === parseInt(id, 10); })[0];
        if (!p) return false;
        p.PackageImage = image; p.UpdationDate = now();
        save(); return true;
      },
      remove: function (id) {
        var db = fresh();
        db.tbltourpackages = db.tbltourpackages.filter(function (x) { return x.PackageId !== parseInt(id, 10); });
        save();
      }
    },

    /* =============================================================
     * BOOKINGS  (table tblbooking)  status: 0 pending, 1 confirmed, 2 cancelled
     * =========================================================== */
    bookings: {
      create: function (o) {
        var db = fresh();
        var id = nextId(db, 'tblbooking');
        db.tblbooking.push({
          BookingId: id, PackageId: parseInt(o.packageId, 10), UserEmail: o.email,
          FromDate: o.from, ToDate: o.to, Comment: o.comment, RegDate: now(),
          status: 0, CancelledBy: null, UpdationDate: null
        });
        save(); return id;
      },
      // join helper = "tblbooking LEFT JOIN tblusers LEFT JOIN tbltourpackages"
      _join: function (b) {
        var db = load();
        var u = db.tblusers.filter(function (x) { return x.EmailId === b.UserEmail; })[0] || {};
        var p = db.tbltourpackages.filter(function (x) { return x.PackageId === b.PackageId; })[0] || null;
        var r = clone(b);
        r.FullName = u.FullName || ''; r.MobileNumber = u.MobileNumber || '';
        r.PackageName = p ? p.PackageName : '(package deleted)'; r.packageExists = !!p;
        return r;
      },
      all: function () { return load().tblbooking.map(TMS.bookings._join); },
      forUserEmail: function (email) {   // admin side, includes joins
        return load().tblbooking.filter(function (b) { return b.UserEmail === email; }).map(TMS.bookings._join);
      },
      // user side: INNER JOIN with packages (bookings of deleted packages disappear, like the original)
      forUser: function (email) {
        return TMS.bookings.forUserEmail(email).filter(function (b) { return b.packageExists; });
      },
      cancelByUser: function (email, id) {
        var db = fresh();
        var b = db.tblbooking.filter(function (x) { return x.UserEmail === email && x.BookingId === parseInt(id, 10); })[0];
        if (!b) return { ok: false, msg: 'Booking not found.' };
        if (b.status === 2) return { ok: false, msg: 'Booking is already cancelled.' };
        if (!(daysUntil(b.FromDate) > 1)) return { ok: false, msg: "You can't cancel booking before 24 hours" };
        b.status = 2; b.CancelledBy = 'u'; b.UpdationDate = now();
        save();
        return { ok: true, msg: 'Booking Cancelled successfully' };
      },
      adminCancel: function (id) {
        var db = fresh();
        var b = db.tblbooking.filter(function (x) { return x.BookingId === parseInt(id, 10); })[0];
        if (!b) return false;
        b.status = 2; b.CancelledBy = 'a'; b.UpdationDate = now();
        save(); return true;
      },
      adminConfirm: function (id) {
        var db = fresh();
        var b = db.tblbooking.filter(function (x) { return x.BookingId === parseInt(id, 10); })[0];
        if (!b) return false;
        b.status = 1; b.UpdationDate = now();
        save(); return true;
      }
    },

    /* =============================================================
     * ENQUIRIES  (table tblenquiry)  Status: null = new, 1 = read
     * =========================================================== */
    enquiries: {
      all: function () { return clone(load().tblenquiry); },
      create: function (o) {
        var db = fresh();
        var id = nextId(db, 'tblenquiry');
        db.tblenquiry.push({
          id: id, FullName: o.fname, EmailId: o.email, MobileNumber: o.mobile,
          Subject: o.subject, Description: o.description, PostingDate: now(), Status: null
        });
        save(); return id;
      },
      markRead: function (id) {
        var db = fresh();
        var e = db.tblenquiry.filter(function (x) { return x.id === parseInt(id, 10); })[0];
        if (e) { e.Status = 1; save(); }
      },
      remove: function (id) {
        var db = fresh();
        db.tblenquiry = db.tblenquiry.filter(function (x) { return x.id !== parseInt(id, 10); });
        save();
      }
    },

    /* =============================================================
     * ISSUES / SUPPORT TICKETS  (table tblissues)
     * =========================================================== */
    issues: {
      create: function (email, issue, description) {
        var db = fresh();
        var id = nextId(db, 'tblissues');
        db.tblissues.push({
          id: id, UserEmail: email, Issue: issue, Description: description,
          PostingDate: now(), AdminRemark: null, AdminremarkDate: null
        });
        save(); return id;
      },
      forUser: function (email) {
        return clone(load().tblissues.filter(function (x) { return x.UserEmail === email; }));
      },
      all: function () {   // joined with users, like the admin SQL
        var db = load();
        return db.tblissues.map(function (i) {
          var u = db.tblusers.filter(function (x) { return x.EmailId === i.UserEmail; })[0] || {};
          var r = clone(i);
          r.FullName = u.FullName || ''; r.MobileNumber = u.MobileNumber || '';
          return r;
        });
      },
      get: function (id) {
        var i = load().tblissues.filter(function (x) { return x.id === parseInt(id, 10); })[0];
        return i ? clone(i) : null;
      },
      setRemark: function (id, remark) {
        var db = fresh();
        var i = db.tblissues.filter(function (x) { return x.id === parseInt(id, 10); })[0];
        if (!i) return false;
        i.AdminRemark = remark; i.AdminremarkDate = now();
        save(); return true;
      },
      remove: function (id) {
        var db = fresh();
        db.tblissues = db.tblissues.filter(function (x) { return x.id !== parseInt(id, 10); });
        save();
      }
    },

    /* =============================================================
     * CMS PAGES  (table tblpages: terms / privacy / aboutus / contact)
     * =========================================================== */
    pages: {
      get: function (type) {
        var p = load().tblpages.filter(function (x) { return x.type === type; })[0];
        return p ? p.detail : null;
      },
      set: function (type, detail) {
        var db = fresh();
        var p = db.tblpages.filter(function (x) { return x.type === type; })[0];
        if (!p) { p = { id: nextId(db, 'tblpages'), type: type, detail: '' }; db.tblpages.push(p); }
        p.detail = detail;
        save();
      }
    },

    /* =============================================================
     * ADMIN  (table admin)
     * =========================================================== */
    admin: {
      login: function (username, password) {
        var hash = md5(password);
        var ok = load().admin.some(function (x) { return x.UserName === username && x.Password === hash; });
        if (ok) lsSet(ADMIN_SESSION_KEY, username);
        return ok;
      },
      logout: function () { lsDel(ADMIN_SESSION_KEY); },
      current: function () { return Session.admin(); },
      get: function (username) {
        var a = load().admin.filter(function (x) { return x.UserName === username; })[0];
        return a ? clone(a) : null;
      },
      updateProfile: function (username, o) {
        var db = fresh();
        var a = db.admin.filter(function (x) { return x.UserName === username; })[0];
        if (!a) return false;
        a.Name = o.name; a.EmailId = o.email; a.MobileNumber = o.mobile; a.updationDate = now();
        save(); return true;
      },
      changePassword: function (username, current, next) {
        var db = fresh();
        var a = db.admin.filter(function (x) { return x.UserName === username && x.Password === md5(current); })[0];
        if (!a) return false;
        a.Password = md5(next); a.updationDate = now();
        save(); return true;
      },
      resetPassword: function (email, mobile, next) {
        var db = fresh();
        var a = db.admin.filter(function (x) { return x.EmailId === email && String(x.MobileNumber) === String(mobile); })[0];
        if (!a) return false;
        a.Password = md5(next); a.updationDate = now();
        save(); return true;
      }
    }
  };

  // make sure the database exists as soon as the script is loaded
  load();

  global.TMS = TMS;
})(window);
