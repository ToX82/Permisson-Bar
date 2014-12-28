/*
   Plugin Name: Permission Bar
   Plugin URL: http://permissionbar.com/
   Author: Milosz Falinski, Callum Hopkins & StudioNEC.
   Description: Permission Bar is a free & simple solution to the EU cookie law.
   Version: 1.6
*/
var languages = [
    'en',
    'it',
    'fr'
];

function setupPermissionsBar() {

    function loadAssets() {
        // Load CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", "permissionbar.css");
        document.head.appendChild(fileref);
        // Get browser's language
        var userLang = navigator.language || navigator.userLanguage;
        // Specify userLang = "xx" here if you need to force a specific language
        if (languages.indexOf(userLang) < 0) {
            userLang = "en";
        }
        // Load the correct language messages file and set some variables
        request = new XMLHttpRequest();
        request.open('GET', "lang/" + userLang + ".html", false);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                resp = request.responseText;
                document.body.innerHTML += (resp);

                permissionBar = document.getElementById('permission-bar');
                button = document.getElementById('permission-bar-button');
                buttonNo = document.getElementById('permission-bar-button-no');
                promptBtn = document.getElementById('permission-bar-prompt-button');
                promptClose = document.getElementById('permission-bar-prompt-close');
                prompt = document.getElementById('permission-bar-prompt');
            }
        };
        request.send();
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

    function removeCookies() {
        // Clear cookies
        document.cookie.split(";")
            .forEach(function (c) {
                document.cookie = c.replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date()
                        .toUTCString() + ";path=/");
            });
        // Clear localStorage
        localStorage.clear();
    }

    function fadeIn(el) {
        var s = el.style;
        s.opacity = 0;
        s.display = "block";
        (function fade() {
            (s.opacity -= -0.1) > 0.9 ? null : setTimeout(fade, 25);
        })();
    }

    function fadeOut(el) {
        var s = el.style;
        s.opacity = 1;
        (function fade() {
            (s.opacity -= 0.1) < 0.1 ? s.display = "none" : setTimeout(fade, 25);
        })();
    }

    function actions() {
        button.addEventListener('click', function () {
            setCookie("permissionbar", "CookiesAllowed", 30);
            fadeOut(permissionBar);
        });
        buttonNo.addEventListener('click', function () {
            removeCookies();
            fadeOut(permissionBar);
        });
        promptBtn.addEventListener('click', function () {
            fadeIn(prompt);
        });
        promptClose.addEventListener('click', function () {
            fadeOut(prompt);
        });
    }

    function loadStuff() {
        var accepted = getCookie("permissionbar");
        if (accepted === null || accepted === "" || accepted === undefined) {
            loadAssets();
            actions();

            fadeIn(permissionBar);            
        }
    }

    loadStuff();
}


// Load the script only if there is at least a cookie or a localStorage item
document.addEventListener("DOMContentLoaded", function () {
    if (document.cookie.length > 0 || window.localStorage.length > 0) {
        setupPermissionsBar();
    }
});