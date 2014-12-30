Permisson Bar
=============

Permission Bar is a free & simple solution to the EU cookie law.


## Why use Permission Bar?

There is a lot of mystery and fuss surrounding the new EU cookie legislation, but it’s essentially really simple. Cookies are files used to track site activity and most websites use them. Site owners need to make the use of cookies very obvious to visitors.

Permission bar makes it simple and clear to visitors that cookies are in use and tells them how to adjust browser settings if they are concerned.


## Important Legal Reading

1.  Belgio: Commission de la protection de la vie priv&eacute;e ([Francese](http://www.privacycommission.be/sites/privacycommission/files/documents/Projet_de_recommandation_cookies.pdf)|[Olandese](http://www.privacycommission.be/sites/privacycommission/files/documents/Ontwerp_aanbeveling_cookies.pdf))
2.  Czech Republic:[&Uacute;řad pro ochranu osobn&iacute;ch &uacute;dajů](http://www.uoou.cz/vismo/zobraz_dok.asp?id_org=200144&amp;id_ktg=1853&amp;n=cookies-prechod-z-principu-opt-out-na-opt-in&amp;query=cookie)
3.  France:[Commission Nationale de l&#39;Informatique et des Libert&eacute;s](http://www.cnil.fr/vos-obligations/sites-web-cookies-et-autres-traceurs/)
4.  Italy:[Garante per la protezione dei dati personali](http://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/2142939)
5.  Luxembourg:[Commission nationale pour la protection des donn&eacute;es](http://www.cnpd.public.lu/fr/actualites/international/2012/06/G29-avis-cookies/index.html?highlight=cookies)
6.  Netherlands:[Autoriteit Consument en Markt](https://www.acm.nl/nl/publicaties/publicatie/12768/Veelgestelde-vragen-over-de-cookiebepaling/)
7.  Spain:[Agencia de Protecci&oacute;n de Datos](http://www.agpd.es/portalwebAGPD/canaldocumentacion/publicaciones/common/Guias/Guia_Cookies.pdf)
8.  UK:[Information Commissioner&#39;s Office](http://ico.org.uk/for_organisations/privacy_and_electronic_communications/the_guide/cookies)


## How it works?
 
Permisson Bar is pure vanilla javascript code, no jQuery or any other frameworks needed. If a website has a cookie or some localStorage data set then the bar is shown, otherwhise nothing happens.

Once user clicks 'Allow Cookies' Permission Bar will set a cookie for that domain with a name 'permissionbar' that will expire in 30 days. This means that the plugin will only show up once per domain (per month).

If a user decides to click "Disallow Cookies", Permissions Bar will simply remove all cookies and localStorage data.


## How to Install?

1. Grab the Github repo and place it on the server in its own directory. All the files, including images and stylesheets, need to maintain it's relative structure - that is be in the same directory - for the plugin to work correctly. 
2. Put the following code on all relevant pages of your website as the last thing before the &lt;/body&gt; tag.

Use this for the standard configuration

	<script type="text/javascript" src="PATH-TO/permissionbar-latest.js"></script>

Or, if you need to configure it, you can do it like that:

	<script type="text/javascript" src="PATH-TO/permissionbar-latest.js?forceYes=1"></script>

Here is a short list of parameters you can use:

    forceYes=1 <= hides deny consent button and text
    forceLang=XX <= force a specific language
    blocking=1 <= blocks all the page until the user clicks deny or consent cookies
	

## Changelog

### Version 1.9

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
	
