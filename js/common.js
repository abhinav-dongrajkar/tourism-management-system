/*!
 * Tourism Management System - shared UI for the public (user) site
 * Renders the header, footer and the Sign-up / Sign-in / Write-us pop-ups
 * on every page and wires up their forms to the localStorage database (db.js).
 *
 * Usage on a page:   TMS_UI.boot({ auth: true }, function () { ...render page... });
 */
(function (global, $) {
  'use strict';
  var esc = TMS.esc;

  var PAGE_TITLES = {
    aboutus: 'About Us', privacy: 'Privacy Policy', terms: 'Terms of Use', contact: 'Contact Us'
  };

  function qs(name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(global.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  }

  /* ---------- header (changes when the user is logged in) ---------- */
  function headerHTML(user) {
    var top;
    if (user) {
      top =
        '<div class="top-header"><div class="container">' +
        '<ul class="tp-hd-lft wow fadeInLeft animated" data-wow-delay=".5s">' +
        '<li class="hm"><a href="index.html"><i class="fa fa-home"></i></a></li>' +
        '<li class="prnt"><a href="profile.html">My Profile</a></li>' +
        '<li class="prnt"><a href="change-password.html">Change Password</a></li>' +
        '<li class="prnt"><a href="tour-history.html">My Tour History</a></li>' +
        '<li class="prnt"><a href="issuetickets.html">Raised Tickets</a></li>' +
        '</ul>' +
        '<ul class="tp-hd-rgt wow fadeInRight animated" data-wow-delay=".5s">' +
        '<li class="tol">Welcome :</li>' +
        '<li class="sig">' + esc(user) + '</li>' +
        '<li class="sigi"><a href="#" id="tms-logout">/ Logout</a></li>' +
        '</ul><div class="clearfix"></div></div></div>';
    } else {
      top =
        '<div class="top-header"><div class="container">' +
        '<ul class="tp-hd-lft wow fadeInLeft animated" data-wow-delay=".5s">' +
        '<li class="hm"><a href="index.html"><i class="fa fa-home"></i></a></li>' +
        '<li class="hm"><a href="admin/index.html">Admin Login</a></li>' +
        '</ul>' +
        '<ul class="tp-hd-rgt wow fadeInRight animated" data-wow-delay=".5s">' +
        '<li class="tol">Toll Number : 123-4568790</li>' +
        '<li class="sig"><a href="#" data-toggle="modal" data-target="#myModal">Sign Up</a></li>' +
        '<li class="sigi"><a href="#" data-toggle="modal" data-target="#myModal4">/ Sign In</a></li>' +
        '</ul><div class="clearfix"></div></div></div>';
    }

    var help = user
      ? '<li>Need Help?<a href="#" data-toggle="modal" data-target="#myModal3"> / Write Us </a></li>'
      : '<li><a href="enquiry.html"> Enquiry </a></li>';

    return top +
      '<div class="header"><div class="container">' +
      '<div class="logo wow fadeInDown animated" data-wow-delay=".5s"><a href="index.html">Tourism <span>Management System</span></a></div>' +
      '<div class="lock fadeInDown animated" data-wow-delay=".5s">' +
      '<li><i class="fa fa-lock"></i></li><li><div class="securetxt">SAFE &amp; SECURE </div></li><div class="clearfix"></div></div>' +
      '<div class="clearfix"></div></div></div>' +
      '<div class="footer-btm wow fadeInLeft animated" data-wow-delay=".5s"><div class="container"><div class="navigation">' +
      '<nav class="navbar navbar-default">' +
      '<div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
      '<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></div>' +
      '<div class="collapse navbar-collapse nav-wil" id="bs-example-navbar-collapse-1"><nav class="cl-effect-1"><ul class="nav navbar-nav">' +
      '<li><a href="index.html">Home</a></li>' +
      '<li><a href="page.html?type=aboutus">About</a></li>' +
      '<li><a href="package-list.html">Tour Packages</a></li>' +
      '<li><a href="page.html?type=privacy">Privacy Policy</a></li>' +
      '<li><a href="page.html?type=terms">Terms of Use</a></li>' +
      '<li><a href="page.html?type=contact">Contact Us</a></li>' +
      help +
      '<div class="clearfix"></div></ul></nav></div></nav></div><div class="clearfix"></div></div></div>';
  }

  var FOOTER_HTML =
    '<div class="copy-right"><div class="container">' +
    '<div class="footer-social-icons wow fadeInDown animated"  data-wow-delay=".5s"><ul>' +
    '<li><a class="facebook" href="#"><span>Facebook</span></a></li>' +
    '<li><a class="twitter" href="#"><span>Twitter</span></a></li>' +
    '<li><a class="flickr" href="#"><span>Flickr</span></a></li>' +
    '<li><a class="googleplus" href="#"><span>Google+</span></a></li>' +
    '<li><a class="dribbble" href="#"><span>Dribbble</span></a></li></ul></div>' +
    '<p class="wow zoomIn animated" data-wow-delay=".5s"> TMS . All Rights Reserved </p></div></div>';

  var MODALS_HTML =
    /* ---- sign up ---- */
    '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content">' +
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' +
    '<section><div class="modal-body modal-spa"><div class="login-grids"><div class="login"><div class="login-right">' +
    '<form name="signup" id="tms-signup-form">' +
    '<h3>Create your account </h3>' +
    '<input type="text" placeholder="Full Name" name="fname" autocomplete="off" required>' +
    '<input type="text" placeholder="Mobile number" maxlength="10" pattern="[0-9]{10}" title="Enter a 10 digit mobile number" name="mobilenumber" autocomplete="off" required>' +
    '<input type="email" placeholder="Email id" name="email" id="tms-signup-email" autocomplete="off" required>' +
    '<span id="user-availability-status" style="font-size:12px;"></span>' +
    '<input type="password" placeholder="Password" name="password" required>' +
    '<input type="submit" id="submit" value="CREATE ACCOUNT">' +
    '</form></div><div class="clearfix"></div></div>' +
    '<p>By logging in you agree to our <a href="page.html?type=terms">Terms and Conditions</a> and <a href="page.html?type=privacy">Privacy Policy</a></p>' +
    '</div></div></section></div></div></div>' +
    /* ---- sign in ---- */
    '<div class="modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content modal-info">' +
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' +
    '<div class="modal-body modal-spa"><div class="login-grids"><div class="login"><div class="login-right">' +
    '<form id="tms-signin-form"><h3>Signin with your account </h3>' +
    '<input type="text" name="email" id="tms-signin-email" placeholder="Enter your Email" required>' +
    '<input type="password" name="password" id="tms-signin-password" placeholder="Password" required>' +
    '<h4><a href="forgot-password.html">Forgot password</a></h4>' +
    '<input type="submit" value="SIGNIN"></form></div><div class="clearfix"></div></div>' +
    '<p>By logging in you agree to our <a href="page.html?type=terms">Terms and Conditions</a> and <a href="page.html?type=privacy">Privacy Policy</a></p>' +
    '</div></div></div></div></div>' +
    /* ---- write us (help ticket, logged-in users only) ---- */
    '<div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content">' +
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>' +
    '<section><form name="help" id="tms-help-form"><div class="modal-body modal-spa"><div class="writ"><h4>HOW CAN WE HELP YOU</h4><ul>' +
    '<li class="na-me"><select id="country" name="issue" class="frm-field required sect" required>' +
    '<option value="">Select Issue</option><option value="Booking Issues">Booking Issues</option>' +
    '<option value="Cancellation"> Cancellation</option><option value="Refund">Refund</option><option value="Other">Other</option></select></li>' +
    '<li class="descrip"><input class="special" type="text" placeholder="description" name="description" required></li>' +
    '<div class="clearfix"></div></ul><div class="sub-bn"><button type="submit" class="subbtn">Submit</button></div></div></div></form></section>' +
    '</div></div></div>';

  /* ---------- behaviour of the pop-up forms ---------- */
  function bindForms(loggedIn) {
    // log out
    $(document).on('click', '#tms-logout', function (e) {
      e.preventDefault();
      TMS.users.logout();
      global.location.href = 'index.html';
    });

    // sign in
    $('#tms-signin-form').on('submit', function (e) {
      e.preventDefault();
      var email = $.trim($('#tms-signin-email').val());
      if (TMS.users.login(email, $('#tms-signin-password').val())) {
        global.location.href = 'package-list.html';
      } else {
        alert('Invalid Details');
      }
    });

    // sign up (+ live "email available?" check)
    function checkEmail() {
      var email = $.trim($('#tms-signup-email').val());
      var $s = $('#user-availability-status'), $b = $('#submit');
      if (!email) { $s.html(''); return true; }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        $s.html("<span style='color:red'>error : You did not enter a valid email.</span>"); return false;
      }
      if (TMS.users.emailExists(email)) {
        $s.html("<span style='color:red'> Email already exists .</span>"); $b.prop('disabled', true); return false;
      }
      $s.html("<span style='color:green'> Email available for Registration .</span>"); $b.prop('disabled', false); return true;
    }
    $('#tms-signup-email').on('blur change', checkEmail);

    $('#tms-signup-form').on('submit', function (e) {
      e.preventDefault();
      if (!checkEmail()) return;
      var f = this;
      try {
        TMS.users.register({
          fname: $.trim(f.fname.value), mobile: f.mobilenumber.value,
          email: $.trim(f.email.value), password: f.password.value
        });
        TMS.setFlash('You are Scuccessfully registered. Now you can login ');
      } catch (err) {
        TMS.setFlash('Something went wrong. Please try again.');
      }
      global.location.href = 'thankyou.html';
    });

    // write us
    $('#tms-help-form').on('submit', function (e) {
      e.preventDefault();
      var user = TMS.users.current();
      if (!user) return;
      TMS.issues.create(user, this.issue.value, this.description.value);
      TMS.setFlash('Info successfully submited ');
      global.location.href = 'thankyou.html';
    });
  }

  /* ---------- public API ---------- */
  var UI = {
    qs: qs,
    pageTitle: function (type) { return PAGE_TITLES[type] || type; },

    /* one row of the package list (home page + package list page) */
    packageRow: function (p) {
      return '<div class="rom-btm">' +
        '<div class="col-md-3 room-left wow fadeInLeft animated" data-wow-delay=".5s">' +
        '<img src="' + esc(TMS.imgSrc(p.PackageImage, 'admin/pacakgeimages/')) + '" class="img-responsive" alt=""></div>' +
        '<div class="col-md-6 room-midle wow fadeInUp animated" data-wow-delay=".5s">' +
        '<h4>Package Name: ' + esc(p.PackageName) + '</h4>' +
        '<h6>Package Type : ' + esc(p.PackageType) + '</h6>' +
        '<p><b>Package Location :</b> ' + esc(p.PackageLocation) + '</p>' +
        '<p><b>Features</b> ' + esc(p.PackageFetures) + '</p></div>' +
        '<div class="col-md-3 room-right wow fadeInRight animated" data-wow-delay=".5s">' +
        '<h5>Rs. ' + esc(p.PackagePrice) + '</h5>' +
        '<a href="package-details.html?pkgid=' + esc(p.PackageId) + '" class="view">Details</a></div>' +
        '<div class="clearfix"></div></div>';
    },

    /* booking status text as shown to the user */
    userStatus: function (b) {
      if (b.status === 1) return 'Confirmed';
      if (b.status === 2 && b.CancelledBy === 'u') return 'Canceled by you at ' + b.UpdationDate;
      if (b.status === 2 && b.CancelledBy === 'a') return 'Canceled by admin at ' + b.UpdationDate;
      return 'Pending';
    },

    msg: function (type, text) {      // returns the green / red notice box
      if (!text) return '';
      return type === 'error'
        ? '<div class="errorWrap"><strong>ERROR</strong>:' + esc(text) + ' </div>'
        : '<div class="succWrap"><strong>SUCCESS</strong>:' + esc(text) + ' </div>';
    },

    boot: function (opts, fn) {
      if (typeof opts === 'function') { fn = opts; opts = {}; }
      opts = opts || {};
      var user = TMS.users.current();
      if (opts.auth && !user) { global.location.replace('index.html'); return; }

      $('#tms-header').html(headerHTML(user));
      $('#tms-footer').html(FOOTER_HTML);
      $('#tms-modals').html(MODALS_HTML);
      bindForms(!!user);
      if (fn) fn(user);

      try { new WOW().init(); } catch (e) { /* animations are optional */ }
    }
  };

  global.TMS_UI = UI;
})(window, jQuery);
