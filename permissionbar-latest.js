/*
    Plugin Name: Permission Bar
    Plugin URL: http://permissionbar.com/
    Author: Milosz Falinski, Callum Hopkins & StudioNEC.
    Description: Permission Bar is a free & simple solution to the EU cookie law.
    Version: 1.6

    Usage:
        Just call the js file like this for default configuration:
            <script src="permissionbar-latest.js"></script>
        Or like this if you want to personalize it:
            <script src="permissionbar-latest.js?forceYes=1"></script>

    Url parameters:
        forceYes=1 <= hides deny consent button and text
        forceLang=XX <= force a specific language
*/

var languages = [
    'en',
    'it',
    'fr'
];

function setupPermissionsBar() {
    // Only load the plugin if needed
    var accepted = getCookie("permissionbar");
    if (accepted === undefined) {
        loadAssets();
        prepareActions();
        fadeIn(permissionBar);
    }


    function loadAssets() {
        var userLang = detectLang();

        // Load CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", "permissionbar.css");
        document.head.appendChild(fileref);

        // Load the correct language messages file and set some variables
        var request = new XMLHttpRequest();
        request.open('GET', "lang/" + userLang + ".html", false);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var resp = request.responseText;
                document.body.innerHTML += (resp);

                permissionBar = document.getElementById('permission-bar');
                button = document.getElementById('permission-bar-button');
                buttonNo = document.getElementById('permission-bar-button-no');
                promptBtn = document.getElementById('permission-bar-prompt-button');
                promptClose = document.getElementById('permission-bar-prompt-close');
                prompt = document.getElementById('permission-bar-prompt');
                promptContent = document.getElementById('permission-bar-prompt-content');   
                promptNoConsent = document.getElementById('permission-bar-no-consent');

                if (getURLParameter("forceYes")) {
                    promptNoConsent.style.display = "none";
                    buttonNo.style.display = "none";
                }
            }
        };
        request.send();
    }

    function detectLang() {
        var userLang = getURLParameter("forceLang");
        if (userLang === false) {
            userLang = navigator.language || navigator.userLanguage;
        }
        if (languages.indexOf(userLang) < 0) {
            userLang = "en";
        }
        return userLang;
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

    function getURLParameter(name) {
        var myTag = document.getElementsByTagName("script");
        var src = myTag[myTag.length - 1].src;
        var set = unescape(src).split(name + "=");
        if (set[1]) {
            return set[1].split(/[&?]+/)[0];
        } else {
            return false;
        }
    }

    function prepareActions() {
        button.addEventListener('click', function () {
            setCookie("permissionbar", "CookiesAllowed", 30);
            fadeOut(permissionBar);
        });
        buttonNo.addEventListener('click', function () {
            var txt = promptNoConsent.innerText;
            var confirm = window.confirm(txt);
            if (confirm === true) {
                removeCookies();
                fadeOut(permissionBar);
            }
        });
        promptBtn.addEventListener('click', function () {
            fadeIn(prompt);
        });
        promptClose.addEventListener('click', function () {
            fadeOut(prompt);
        });
    }
}


// Load the script only if there is at least a cookie or a localStorage item
document.addEventListener("DOMContentLoaded", function () {
    if (document.cookie.length > 0 || window.localStorage.length > 0) {
        setupPermissionsBar();
    }
});