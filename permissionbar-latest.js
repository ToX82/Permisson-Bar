/*
   Plugin Name: Permission Bar
   Plugin URL: http://permissionbar.com/
   Author: Milosz Falinski, Callum Hopkins & StudioNEC.
   Description: Permission Bar is a free & simple solution to the EU cookie law.
   Version: 1.6
*/
var jQload = false;
var languages = [
    'en',
    'it',
    'fr'
];

 function setupPermissionsBar() {
    if (typeof (jQuery) == 'undefined') {
        if(!jQload) {
            jQload = true;
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js";
            document.getElementsByTagName('head')[0].appendChild(script);
        }
        setTimeout(setupPermissionsBar, 50);
    } else {
        (function ($) {
            function loadAssets() {
                // Load CSS file
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", "permissionbar.css");
                document.getElementsByTagName("head")[0].appendChild(fileref);

                // Get browser's language
                var userLang = navigator.language || navigator.userLanguage;
                // Specify userLang = "xx" here if you need to force a specific language

                if ( $.inArray(userLang, languages) < 0) {
                    userLang = "en";
                }

                // Load the correct language messages file
                $.ajax({
                    url: "lang/" + userLang + ".html",
                    async: false
                }).done(function( html ) {
                    $('body').append(html);
                });
            }

            function getCookie(c_name) {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
            }
            function setCookie(c_name, value, exdays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
                document.cookie = c_name + "=" + c_value;
            }
            function checkCookie() {
                var permissionbar = getCookie("permissionbar");
                if (permissionbar === null || permissionbar === "" || permissionbar === undefined) {
                    $('#permission-bar').fadeIn('slow');
                }
            }
            function removeCookies() {
                // Clear cookies
                document.cookie.split(";").forEach(function(c) { 
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                });
                // Clear localStorage
                localStorage.clear();
            }

            function actions() {
                var button = $('#permission-bar-button');
                var buttonNo = $('#permission-bar-button-no');
                var promptBtn = $('#permission-bar-prompt-button');
                var promptClose = $('#permission-bar-prompt-close');
                var prompt = $('#permission-bar-prompt');
                var promptContent = $('#permission-bar-prompt-content');

                button.on('click', function () {
                    setCookie("permissionbar", "CookiesAllowed", 30);
                    $('#permission-bar').fadeOut('slow');
                });
                buttonNo.on('click', function() {
                    removeCookies();
                    $('#permission-bar').fadeOut('slow');
                });

                promptBtn.on('click', function () {
                    prompt.fadeIn('slow');
                });
                promptClose.on('click', function () {
                    prompt.fadeOut('slow');
                });
                promptContent.css({
                    top: $(window).height() / 2 - 225,
                    left: ($(window).width() / 2) - 225
                });
            }

            $(document).ready(function () {
                loadAssets();
                actions();
                checkCookie();
            });
        })(jQuery);
    }
}

// Load the script only if there is at least a cookie or a localStorage item
if (document.cookie.length > 0 || window.localStorage.length > 0) {
    setupPermissionsBar();
}