// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/*************************************************************************************
 * Los diferentes estados por los que puede pasar la aplicación. Cada estado se corresponde
 * con una página de la aplicación.
 *
 * Para cada estado se define la página html y el controlador.
  ***********************************************************************************/
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('splash', {
          url: "/app/splash",
          templateUrl: "templates/splash.html",
          controller: 'AppCtrl'
    })
    .state('home', {
        url: "/app/home",
        templateUrl: "templates/home.html",
          controller: 'AppCtrl'
    })
    .state('app.calendarios', {
        url: "/calendarios",
        views: {
            'menuContent' :{
                templateUrl: "templates/calendarios.html"
            }
        }
    })
      .state('app.horarios', {
          url: "/horarios",
          views: {
              'menuContent' :{
                  templateUrl: "templates/horarios.html"
              }
          }
      })

    .state('app.info', {
        url: "/info",
        views: {
            'menuContent' :{
                templateUrl: "templates/info.html"
            }
        }
    })

    .state('app.noticias', {
      url: "/noticias",
      views: {
        'menuContent' :{
          templateUrl: "templates/noticias.html",
          controller: 'NoticiasCtrl'
        }
      }
    })

    .state('app.noticia', {
      url: "/noticias/:noticiaId",
      views: {
        'menuContent' :{
          templateUrl: "templates/noticia.html",
          controller: 'NoticiasCtrl'
        }
      }
    })

    .state('app.incidencias', {
        url: "/incidencias",
        views: {
            'menuContent' :{
                templateUrl: "templates/incidencias.html",
                controller: 'IncidenciasCtrl'
            }
        }
    })

    .state('app.incidencia', {
        url: "/incidencias/:incidenciaId",
        views: {
            'menuContent' :{
                templateUrl: "templates/incidencia.html",
                controller: 'IncidenciasCtrl'
            }
        }
    })
      .state('app.examenes', {
          url: "/examenes",
          views: {
              'menuContent' :{
                  templateUrl: "templates/examenes.html"
              }
          }
      })
      .state('app.examenJunio', {
          url: "/examenes/examenJunio",
          views: {
              'menuContent' :{
                  templateUrl: "templates/examenesJunio.html",
                  controller: 'examenesJunioCtrl'
              }
          }
      })
      .state('app.examenSeptiembre', {
          url: "/examenes/examenSeptiembre",
          views: {
              'menuContent' :{
                  templateUrl: "templates/examenesSeptiembre.html",
                  controller: 'examenesSeptiembreCtrl'
              }
          }
      });


  
  // Si ninguno de los estados anteriores es llamado, la aplicación vuelve al inicio --> splash
        $urlRouterProvider.otherwise('/app/splash');
});
