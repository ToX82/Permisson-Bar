Permisson Bar
=============

Permission Bar is a free & simple solution to the EU cookie law.

##### Why use Permission Bar?

There is a lot of mystery and fuss surrounding the new EU cookie legislation, but it's essentially really simple. Cookies are files used to track site activity and most websites use them. Site owners need to make the use of cookies very obvious to visitors.

Permission bar makes it simple and clear to visitors that cookies are in use and tells them how to adjust browser settings if they are concerned.

##### TL;DR

Just place this somewhere in your website and forget it:

    http://www.itoscano.com/PATH-TO/permissionbar-latest.js

##### How it works?

Permisson Bar is pure vanilla javascript code, no jQuery or any other frameworks needed. If a website has a cookie or some localStorage data set then the bar is shown, otherwhise nothing happens.

Once user clicks 'Allow Cookies' Permission Bar will set a cookie for that domain with a name 'permissionbar' that will expire in 30 days. This means that the plugin will only show up once per domain (per month).

If a user decides to click "Disallow Cookies", Permissions Bar will simply remove all cookies and localStorage data.

##### How many languages are supported?

Currently, the supported languages for Permission Bar are:

* it - Italian
* en - English
* fr - French

The user language is automatically detected by the browser, but you can force a specific language by passing an optional parameter (see below).

##### How to Install?

1. Grab the [Github][1] repo and place it on the server in its own directory. All the files, including images and stylesheets, need to maintain it's relative structure - that is be in the same directory - for the plugin to work correctly.
2. Put the code you have seen in TL;DR section somewhere on all relevant pages of your website.

###### If you need to configure it, you can do it like that:

    http://www.itoscano.com/PATH-TO/permissionbar-latest.js?forceYes=1&desiredParameters

##### Here is a short list of parameters you can use:

    forceYes=1 <= hides deny consent button and text
    forceLang=XX <= force a specific language
    blocking=1 <= blocks all the page until the user clicks deny or consent cookies
	

## Changelog

### Version 2.0

	Version 2.0
	Date of Commit 16.03.15
	Author: Emanuele "ToX" Toscano
	Cleaner explainatory text, added browser instructions to disable cookies

	Version 1.9
	Date of Commit 30.12.14
	Author: Emanuele "ToX" Toscano
	Added (optional) blocking behavior: if this option is active, the page is blocked until the user clicks deny or consent cookies

	Version 1.8
	Date of Commit 29.12.14
	Author: Emanuele "ToX" Toscano
	Plugin is now configurable by passing parameters to the script src.

	Version 1.7
	Date of Commit 28.12.14
	Author: Emanuele "ToX" Toscano
	Plugin doesn't need jQuery anymore since everything has been translated to pure vanilla javascript. Some minor additional changes.

	Version 1.6
	Date of Commit 28.12.14
	Author: Emanuele "ToX" Toscano
	Added multilanguage (browser detected) and localStorage support. Added some additional checks to verify if
	the bar is needed or not (there is no reason to show this bar if you are not using cookies nor localStorage). Several other minor changes too.

	Version 1.5
	Date of Commit 28.05.12
	Cleaned jQuery slightly, reduced script size. Changed CSS slightly.

	Initial version 
	Date of Commit: 28.05.12
	Code is of questionable quality, but it works.
	
