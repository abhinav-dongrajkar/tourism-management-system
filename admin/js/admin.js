/*!
 * Tourism Management System - shared code for the admin panel
 * Renders header / sidebar / footer on every admin page, checks the admin login
 * and offers a few helpers used by the manage-* pages.
 *
 * Usage on a page:   ADM.boot({ crumb: 'Manage Users' }, function (adminUser) { ... });
 */
(function (global, $) {
  'use strict';
  var esc = TMS.esc;

  function qs(name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(global.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }

  function headerHTML(adminName) {
    return '<div class="header-main">' +
      '<div class="logo-w3-agile"><h1><a href="dashboard.html">Tourism Management System</a></h1></div>' +
      '<div class="profile_details w3l"><ul><li class="dropdown profile_details_drop">' +
      '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><div class="profile_img">' +
      '<span class="prfil-img"><img src="images/User-icon.png" alt=""> </span>' +
      '<div class="user-name"><p>Welcome</p><span>' + esc(adminName) + '</span></div>' +
      '<i class="fa fa-angle-down"></i><i class="fa fa-angle-up"></i><div class="clearfix"></div></div></a>' +
      '<ul class="dropdown-menu drp-mnu">' +
      '<li> <a href="profile.html"><i class="fa fa-lock"></i> Profile</a> </li>' +
      '<li> <a href="change-password.html"><i class="fa fa-lock"></i> Setting</a> </li>' +
      '<li> <a href="#" id="adm-logout"><i class="fa fa-sign-out"></i> Logout</a> </li>' +
      '</ul></li></ul></div><div class="clearfix"> </div></div>';
  }

  var SIDEBAR_HTML =
    '<div class="sidebar-menu"><header class="logo1"><a href="#" class="sidebar-icon"> <span class="fa fa-bars"></span> </a></header>' +
    '<div style="border-top:1px ridge rgba(255, 255, 255, 0.15)"></div><div class="menu"><ul id="menu">' +
    '<li><a href="dashboard.html"><i class="fa fa-tachometer"></i> <span>Dashboard</span><div class="clearfix"></div></a></li>' +
    '<li id="menu-academico"><a href="#"><i class="fa fa-list-ul" aria-hidden="true"></i><span> Tour Packages</span> <span class="fa fa-angle-right" style="float: right"></span><div class="clearfix"></div></a>' +
    '<ul id="menu-academico-sub"><li id="menu-academico-avaliacoes"><a href="create-package.html">Create</a></li>' +
    '<li id="menu-academico-avaliacoes"><a href="manage-packages.html">Manage</a></li></ul></li>' +
    '<li id="menu-academico"><a href="manage-users.html"><i class="fa fa-users" aria-hidden="true"></i><span>Manage Users</span><div class="clearfix"></div></a></li>' +
    '<li><a href="manage-bookings.html"><i class="fa fa-list" aria-hidden="true"></i>  <span>Manage Booking</span><div class="clearfix"></div></a></li>' +
    '<li><a href="manageissues.html"><i class="fa fa-table"></i>  <span>Manage Issues</span><div class="clearfix"></div></a></li>' +
    '<li><a href="manage-enquires.html"><i class="fa fa-file-text-o" aria-hidden="true"></i>  <span>Manage Enquiries</span><div class="clearfix"></div></a></li>' +
    '<li><a href="manage-pages.html"><i class="fa fa-file-text-o" aria-hidden="true"></i>  <span>Manage Pages</span><div class="clearfix"></div></a></li>' +
    '</ul></div></div>';

  var FOOTER_HTML = '<div class="copyrights"><p>TMS. All Rights Reserved |  <a href="#">TMS</a> </p></div>';

  var ADM = {
    qs: qs,

    msg: function (type, text) {
      if (!text) return '';
      return type === 'error'
        ? '<div class="errorWrap"><strong>ERROR</strong>:' + esc(text) + ' </div>'
        : '<div class="succWrap"><strong>SUCCESS</strong>:' + esc(text) + ' </div>';
    },

    // re-render the rows of the main data table (keeps the responsive "basictable" plugin working)
    renderTable: function (rowsHtml, emptyText) {
      var $t = $('#table');
      try { $t.basictable('destroy'); } catch (e) { /* not initialised yet */ }
      $t.find('tbody').html(rowsHtml);
      var $empty = $('#table-empty');
      if (!rowsHtml) { $t.hide(); $empty.text(emptyText || 'No records found.').show(); }
      else { $empty.hide(); $t.show(); $t.basictable(); }
    },

    // shared by "Manage Bookings" and "User's Bookings"
    bookingRows: function (list) {
      return list.map(function (b) {
        var status = 'Pending';
        if (b.status === 1) status = 'Confirmed';
        if (b.status === 2 && b.CancelledBy === 'a') status = 'Canceled by you at ' + b.UpdationDate;
        if (b.status === 2 && b.CancelledBy === 'u') status = 'Canceled by User at ' + b.UpdationDate;
        var action;
        if (b.status === 2) action = 'Cancelled';
        else if (b.status === 1) action = 'Confirmed';
        else action = '<a href="#" class="bk-cancel" data-id="' + b.BookingId + '">Cancel</a> / ' +
                      '<a href="#" class="bk-confirm" data-id="' + b.BookingId + '">Confirm</a>';
        var pkg = b.packageExists
          ? '<a href="update-package.html?pid=' + esc(b.PackageId) + '">' + esc(b.PackageName) + '</a>'
          : esc(b.PackageName);
        return '<tr><td>#BK-' + esc(b.BookingId) + '</td><td>' + esc(b.FullName) + '</td><td>' + esc(b.MobileNumber) + '</td>' +
          '<td>' + esc(b.UserEmail) + '</td><td>' + pkg + '</td>' +
          '<td>' + esc(b.FromDate) + ' To ' + esc(b.ToDate) + '</td><td>' + esc(b.Comment) + '</td>' +
          '<td>' + esc(status) + '</td><td>' + action + '</td></tr>';
      }).join('');
    },

    bindBookingActions: function (rerender) {
      $(document).on('click', '.bk-cancel', function (e) {
        e.preventDefault();
        if (!confirm('Do you really want to cancel booking')) return;
        TMS.bookings.adminCancel($(this).data('id'));
        $('#msg').html(ADM.msg('success', 'Booking Cancelled successfully'));
        rerender();
      });
      $(document).on('click', '.bk-confirm', function (e) {
        e.preventDefault();
        if (!confirm('booking has been confirm')) return;
        TMS.bookings.adminConfirm($(this).data('id'));
        $('#msg').html(ADM.msg('success', 'Booking Confirm successfully'));
        rerender();
      });
    },

    boot: function (opts, fn) {
      if (typeof opts === 'function') { fn = opts; opts = {}; }
      opts = opts || {};
      var adminUser = TMS.admin.current();
      if (!adminUser || !TMS.admin.get(adminUser)) { global.location.replace('index.html'); return; }
      var me = TMS.admin.get(adminUser);

      $('#adm-header').replaceWith(headerHTML(me.Name || me.UserName));
      $('#adm-sidebar').replaceWith(SIDEBAR_HTML);
      $('#adm-footer').replaceWith(FOOTER_HTML);
      $('#adm-crumb').html('<li class="breadcrumb-item"><a href="dashboard.html">Home</a>' +
        (opts.crumb ? '<i class="fa fa-angle-right"></i>' + esc(opts.crumb) : '') + '</li>');

      $(document).on('click', '#adm-logout', function (e) {
        e.preventDefault();
        TMS.admin.logout();
        global.location.href = 'index.html';
      });

      // collapsible sidebar
      var toggle = true;
      $('.sidebar-icon').on('click', function (e) {
        e.preventDefault();
        if (toggle) {
          $('.page-container').addClass('sidebar-collapsed').removeClass('sidebar-collapsed-back');
          $('#menu span').css({ position: 'absolute' });
        } else {
          $('.page-container').removeClass('sidebar-collapsed').addClass('sidebar-collapsed-back');
          setTimeout(function () { $('#menu span').css({ position: 'relative' }); }, 400);
        }
        toggle = !toggle;
      });

      // sticky header
      var $hm = $('.header-main'), navoffset = $hm.offset().top;
      $(global).on('scroll', function () {
        if ($(global).scrollTop() >= navoffset) $hm.addClass('fixed'); else $hm.removeClass('fixed');
      });

      if (fn) fn(adminUser);
    }
  };

  global.ADM = ADM;
})(window, jQuery);
