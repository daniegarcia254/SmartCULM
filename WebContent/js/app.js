// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'angularSlideables'])

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
                  templateUrl: "templates/formHorarios.html",
                  controller: 'horariosCtrl'
              }
          }
      })

      .state('app.horariosList', {
          url: "/horariosList",
          views: {
              'menuContent' :{
                  templateUrl: "templates/horarios.html",
                  controller: 'horariosCtrl'
              }
          }
      })

      .state('app.horario', {
          url: "/horarios/:horarioDetalle",
          views: {
              'menuContent' :{
                  templateUrl: "templates/horario.html",
                  controller: 'horariosCtrl'
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

 /*     .state('app.infoZaragoza', {
          url: "/info/zaragoza",
          views: {
              'menuContent' :{
                  templateUrl: "templates/infoZaragoza.html",
                  controller: "infoZaragozaCtrl"
              }
          }
      })*/

      .state('app.infoSanFrancisco', {
          url: "/info/zaragoza/sanfrancisco",
          views: {
              'menuContent' :{
                  templateUrl: "templates/infoSanFrancisco.html",
                  controller: "infoSanFranciscoCtrl"
              }
          }
      })
  
      .state('app.infoRioEbro', {
          url: "/info/zaragoza/rioebro",
          views: {
              'menuContent' :{
                  templateUrl: "templates/infoRioEbro.html",
                  controller: "infoRioEbroCtrl"
              }
          }
      })
  
      .state('app.infoGranVia', {
          url: "/info/zaragoza/granvia",
          views: {
              'menuContent' :{
                  templateUrl: "templates/infoGranVia.html",
                  controller: "infoGranViaCtrl"
              }
          }
      })
  
        .state('app.infoVeterinaria', {
          url: "/info/zaragoza/veterinaria",
          views: {
              'menuContent' :{
                  templateUrl: "templates/infoVeterinaria.html",
                  controller: "infoVeterinariaCtrl"
              }
          }
      })
  
      .state('app.infoHuesca', {
          url: "/info/huesca",
          views: {
              'menuContent' :{
                  templateUrl: "templates/infoHuesca.html",
                  controller: "infoHuescaCtrl"
              }
          }
      })

      .state('app.infoTeruel', {
          url: "/info/teruel",
          views: {
              'menuContent' :{
                  templateUrl: "templates/infoTeruel.html",
                  controller: "infoTeruelCtrl"
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
      })
	  .state('app.profesores', {
          url: "/profesores",
          views: {
              'menuContent' :{
                  templateUrl: "templates/cuestionarioProfesores.html",
                  controller: 'profesoresCtrl'
              }
          }
      })
	  
	  .state('app.profesoresList', {
			url: "/profesoresList",
			views: {
				'menuContent' :{
					templateUrl: "templates/profesores.html",
					controller: 'profesoresCtrl'
				}
			}
        })
	  
	  .state('app.profesor', {
			url: "/profesores/:profesorNombre",
			views: {
				'menuContent' :{
					templateUrl: "templates/profesor.html",
					controller: 'profesoresCtrl'
				}
			}
		})
  
  // Si ninguno de los estados anteriores es llamado, la aplicación vuelve al inicio --> splash
        $urlRouterProvider.otherwise('/app/splash');
});
