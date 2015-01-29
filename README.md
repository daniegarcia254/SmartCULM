SmartCULM
=========

**Mobile && Web app for the CULM (Centro Universitario de Lenguas Modernas de Zaragoza**  
You can download and use both versions of the app in the [official CULM website](http://culm.unizar.es/smartculm).
- **_Android apk_** [download link](https://www.dropbox.com/s/ei69gzmsjk7p8ks/SmartCULM.apk?dl=0)
- **_Web app_** version: [http://www.unizar.es/idiomas/movil](http://www.unizar.es/idiomas/movil)

It's necessary to have one of the latest _Android_ versions and _Chrome_, _Firefox_, _Safari_, etc. versions.

-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------

#####Directories hierarchy:
- [RESTful Web Service](https://github.com/daniegarcia254/smartculm_test/tree/master/src/com/gps/service)
- [Web Scrapping Service](https://github.com/daniegarcia254/SmartCULM/tree/master/src/com/gps/scrapping/culm)
- [Oracle BD connection and query service](https://github.com/daniegarcia254/SmartCULM/tree/master/src/com/gps/bd/minos)
- [WebApp](https://github.com/daniegarcia254/SmartCULM/tree/master/www)

In a few words: the WebApp asks for the data to the web service through AJAX calls to the REST service, which will return the information, either from an _Oracle DB_ or through _web-scraping_.

-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------

The appp has been developed with:  
- Client side:
  - [Ionic Framework](http://ionicframework.com/)
  - [AngularJS](https://angularjs.org/)
  - [PhoneGap](https://build.phonegap.com/) in order to create the _Android_ version
- Server side:
  - [JAX-RS](https://jax-rs-spec.java.net/)
  - [Jsoup library for web-scraping](http://jsoup.org/)
