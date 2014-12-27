/*
   Plugin Name: Permission Bar
   Plugin URL: http://permissionbar.com/
   Author: Milosz Falinski, Callum Hopkins & StudioNEC.
   Description: Permission Bar is a free & simple solution to the EU cookie law.
   Version: 1.6
*/
var jQload = false;

function initPermBar() {
    if (typeof (jQuery) == 'undefined') {
        if (!jQload) {
            jQload = true;
            document.write(unescape('%3Cscript type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"%3E%3C/script%3E'));
        }
        setTimeout("initPermBar()", 50);
    } else {;
        (function ($) {
            var loadExternal = function loadExternal(filename, filetype) {
                if (filetype == "js") {
                    var fileref = document.createElement('script');
                    fileref.setAttribute("type", "text/javascript");
                    fileref.setAttribute("src", filename);
                } else if (filetype == "css") {
                    var fileref = document.createElement("link");
                    fileref.setAttribute("rel", "stylesheet");
                    fileref.setAttribute("type", "text/css");
                    fileref.setAttribute("href", filename);
                }
                if (typeof fileref != "undefined") {
                    document.getElementsByTagName("head")[0].appendChild(fileref);
                }
            };
            var theSetup = function thesetup() {
                loadExternal("permissionbar.css", "css");

				var userLang = navigator.language || navigator.userLanguage; // Get browser's language
				$.ajax({
					url: "lang/" + userLang + ".html",
					async: false
				}).done(function( html ) {
					$('body').append(html);
				});
            };
            var getCookie = function getCookie(c_name) {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
            };
            var setCookie = function setCookie(c_name, value, exdays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
                document.cookie = c_name + "=" + c_value;
            };
            var checkCookie = function checkCookie() {
                var permissionbar = getCookie("permissionbar");
                if (permissionbar === null || permissionbar === "" || permissionbar === undefined) {
                console.log( $('#permission-bar').html() );
                    $('#permission-bar').fadeToggle('slow');
                    var button = $('#permission-bar-button');
                    button.on('click', function (e) {
                        setCookie("permissionbar", "CookiesAllowed", 365);
                        $('#permission-bar').fadeToggle('slow');
                    });
                }
            };
            var permissionBarInit = function permissionBarInit() {
                var button = $('#permission-bar-button');
                var promptBtn = $('#permission-bar-prompt-button');
                var promptClose = $('#permission-bar-prompt-close');
                var prompt = $('#permission-bar-prompt');
                var promptContent = $('#permission-bar-prompt-content');
                promptBtn.on('click', function (e) {
                    prompt.fadeToggle('slow');
                });
                promptClose.on('click', function (e) {
                    prompt.fadeToggle('slow');
                });
                promptContent.css({
                    top: $(window)
                        .height() / 2 - 225,
                    left: ($(window)
                        .width() / 2) - 225
                });
            };
            var permissionBar = function permissionBar() {
                theSetup();
                permissionBarInit();
                checkCookie();
            };
            $(document)
                .ready(function () {
                    permissionBar();
                });
        })(jQuery);
    }
}
initPermBar();
