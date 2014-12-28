Permisson Bar
=============

Permission Bar is a free & simple solution to the EU cookie law.


## Why use Permission Bar?

There is a lot of mystery and fuss surrounding the new EU cookie legislation, but it’s essentially really simple. Cookies are files used to track site activity and most websites use them. Site owners need to make the use of cookies very obvious to visitors.

Permission bar makes it simple and clear to visitors that cookies are in use and tells them how to adjust browser settings if they are concerned.


## Important Legal Reading

1. [Read the EU legislation on cookies](http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm)


## How it works?
 
Permisson Bar uses jQuery for its animations and events. It checks if 'jQuery' is defined, and if it's not, it provides the library by itself (version 1.8 - from Google's CDN). 

Once user clicks 'Allow Cookies' Permission Bar will set a cookie for that domain with a name 'permissionbar' that will expire in 30 days. This means that the plugin will only show up once per domain (per month). 

If a user decides to click "Disallow Cookies", Permissions Bar will simply remove all cookies and localStorage data.


## How to Install?

1. Grab the Github repo and place it on the server in its own directory. All the files, including images and stylesheets, need to maintain it's relative structure - that is be in the same directory - for the plugin to work correctly. 
2. Put the following code on all relevant pages of your website right before the &lt;/body&gt; tag.:

	<code>
	&lt;script type="text/javascript" src="PATH-TO/permissionbar-latest.js"&gt;&lt;/script&gt;
	</code>
	
## Changelog

### Version 1.6

	Version 1.6
	Date of Commit 28.12.14
	Forked by Emanuele "ToX" Toscano, added multilanguage (browser detected) and localStorage support. Added some additional checks to verify if
	the bar is needed or not (there is no reason to show this bar if you are not using cookies nor localStorage). Several other minor changes too.

	Version 1.5
	Date of Commit 28.05.12
	Cleaned jQuery slightly, reduced script size. Changed CSS slightly.

	Initial version 
	Date of Commit: 28.05.12
	Code is of questionable quality, but it works.
	