/*
    Plugin Name: Permission Bar
    Plugin URL: http://permissionbar.com/
    @author: Milosz Falinski, Callum Hopkins & StudioNEC.
    @author: Emanuele "ToX" Toscano
    @description: Permission Bar is a free & simple solution to the EU cookie law.
    @version: 1.9

    Usage:
        Just call the js file like this for default configuration:
            <script src="permissionbar-latest.js"></script>
        Or like this if you want to personalize it:
            <script src="permissionbar-latest.js?forceYes=1"></script>

    Url parameters:
        blocking=1 <= blocks all the page until the user clicks deny or consent cookies
        forceYes=1 <= hides deny consent button and text
        forceLang=XX <= force a specific language
*/

/*
 * Available languages array
 */
var PermissionLanguages = [
    'en',
    'it',
    'fr'
];

/**
 * Main function
 */
function setupPermissionsBar() {

    /**
     * Load plugin only if needed (do nothing if permissionbar cookie is set)
     * @param null
     * @return null
     */
    if (document.cookie.length > 0 || window.localStorage.length > 0) {
        var accepted = getCookie("permissionbar");
        if (accepted === undefined) {
            scriptPath = getScriptPath();

            loadAssets();
            prepareActions();
            fadeIn(permissionBar, 250);
        }
    }

    /**
     * Get this javascript's path
     * @param null
     * @return {String} this javascript's path
     */
    function getScriptPath() {
        var scripts = document.getElementsByTagName("script");

        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].hasAttribute("src")) {
                var path = scripts[i].src;
                if (path.indexOf("permissionbar") >-1) {
                    return path;
                }
            }
        }

        //return scripts[scripts.length - 1].src;
    }

    /**
     * Load external files (css, language files etc.)
     * @param null
     * @return null
     */
    function loadAssets() {
        var userLang = detectLang();

        // Load CSS file
        path = scriptPath.replace(/[^\/]*$/, "");
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", path + "/permissionbar.css");
        document.head.appendChild(fileref);

        // Load the correct language messages file and set some variables
        var request = new XMLHttpRequest();
        request.open('GET', path + "/lang/" + userLang + ".html", false);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var element = document.createElement('div');
                var resp = request.responseText;
                element.innerHTML = resp;
                document.getElementsByTagName('body')[0].appendChild(element);

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

                if (getURLParameter("blocking")) {
                    fadeIn(prompt, 500);
                    promptClose.style.display = "none";
                }
            }
        };
        request.send();
    }


    /**
     * Get browser's language or, if available, the specified one
     * @param null
     * @return {String} userLang - short language name
     */
    function detectLang() {
        var userLang = getURLParameter("forceLang");
        if (userLang === false) {
            userLang = navigator.language || navigator.userLanguage;
        }
        if (PermissionLanguages.indexOf(userLang) < 0) {
            userLang = "en";
        }
        return userLang;
    }

    /**
     * Get Permission Bar's cookie if available
     * @param {string} c_name - cookie name
     * @return {string} cookie value
     */
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

    /**
     * Get Permission Bar's cookie if available
     * @param {string} c_name - cookie name
     * @param {string} value - cookie value
     * @param {string} exdays - expiration days
     * @return null
     */
    function setCookie(c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }

    /**
     * Remove all the cookies and empty localStorage
     * @param null
     * @return null
     */
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


    /**
     * FadeIn effect
     * @param {string} el - element name
     * @param {string} speed - effect duration
     * @return null
     */
    function fadeIn(el, speed) {
        var s = el.style;
        s.opacity = 0;
        s.display = "block";
        (function fade() {
            (s.opacity -= -0.1) > 0.9 ? null : setTimeout(fade, (speed/10));
        })();
    }


    /**
     * FadeOut effect
     * @param {string} el - element name
     * @param {string} speed - effect duration
     * @return null
     */
    function fadeOut(el, speed) {
        var s = el.style;
        s.opacity = 1;
        (function fade() {
            (s.opacity -= 0.1) < 0.1 ? s.display = "none" : setTimeout(fade, (speed/10));
        })();
    }



    /**
     * GET parameter to look for
     * @param {string} name - param name
     * @return {string} param value (false if parameter is not found)
     */
    function getURLParameter(name) {
        var set = unescape(scriptPath).split(name + "=");
        if (set[1]) {
            return set[1].split(/[&?]+/)[0];
        } else {
            return false;
        }
    }

    /**
     * Button actions
     * @param null
     * @return null
     */
    function prepareActions() {
        button.addEventListener('click', function () {
            setCookie("permissionbar", "CookiesAllowed", 30);
            fadeOut(prompt, 250);
            fadeOut(permissionBar, 250);
        });

        buttonNo.addEventListener('click', function () {
            var txt = promptNoConsent.innerText;
            var confirm = window.confirm(txt);
            if (confirm === true) {
                removeCookies();
                fadeOut(prompt, 250);
                fadeOut(permissionBar, 250);
            }
        });

        promptBtn.addEventListener('click', function () {
            fadeIn(prompt, 250);
        });

        promptClose.addEventListener('click', function () {
            fadeOut(prompt, 250);
        });
    }
}


// Load the script only if there is at least a cookie or a localStorage item
document.addEventListener("DOMContentLoaded", function () {
    setupPermissionsBar();
});