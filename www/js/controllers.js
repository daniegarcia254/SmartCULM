(function(){
    var app = angular.module('starter.controllers',[]);
  
    //var URI = 'http://localhost:8080/com.gps.smartculm/rest/smartculm-service';
    var URI = 'http://smartculm-gps25.rhcloud.com/rest/smartculm-service';
      //var URI = window.location.origin + '/rest/smartculm-service';
	 
    var calendario_URI = "https://culm.unizar.es/sites/culm.unizar.es/files/users/adminwebuz/normativa/calendario.pdf";

    /***********************************************************************************************
     * VARIABLES GLOBALES: Inicialización de variables globales donde se guardan los datos recogidos
     ***********************************************************************************************/
    var noticias = [];
    var incidencias = [];
    var examenesJunio = [];
    var examenesSeptiembre = [];
    var horariosValores = ["-----------","08:00-09:30","08:30-10:00","09.30-11.00","09:00-10:30","09:30-11:00","09:30-12:30",
        "10:00-11:30","10:30-12:00","11:00-12:30","11:15-14:15","11:30-13:00","12:00-13:30","12:30-14:00","13.00-14.00",
        "13:30-14:30","13:30-15:00","14:00-15:00","14:00-15:30","14:30-15:30","15:00-16:30","15:00-17:30","15:00-18:00",
        "15:15-16:45","15:30-17:00","16:00-17:00","16:00-18:00","16:00-19:15","16:30-18:00","16:45-18:15","17:00-18:00",
        "17:00-18:30","17:30-19:30","18:00-19:00","18:00-19:30","18:00-20:00","18:15-19:45","18:15-21:15","19:00-20:00",
        "19:30-21:00","19:30-21:30","20:00-21:00"];
    var seccionTodos = ["ALEMÁN","ÁRABE","CHINO","FRANCÉS","GRIEGO","INGLÉS","ITALIANO","JAPONÉS","PORTUGUÉS","RUSO"];
    var edificioTodos = ["BETANCOURT","ECONOMIA","INTERFACULTADES","INTER II","L.NORMANTE","VETERINARIA","VICERRECTORADO HUESCA"];
    var profesoresTodos = [];
    var profTodos = JSON.stringify({
        nombre: "all",
        primerApellido: "",
        segundoApellido: "",
        despacho: "",
        centro: "",
        campus: "",
        seccion: "",
        extension: "",
        mail: "",
        tutorias: "",
        web: ""
    });

    /**********************************************************************
     * FACTORY: Servicio que define todas las llamadas al web service para recoger los datos
     ***********************************************************************/
    app.factory('GetInfoService', function($http, $q, $timeout, $ionicPopup, $ionicLoading, $state, $rootScope) {

        //Llamada AJAX al web service para recoger las noticias de la pág web del CULM
        var getNoticias = function () {
            var deferred = $q.defer();
            $timeout(function () {
                $rootScope.primerAcceso = true;
                $http.get(URI + '/noticias').then(
                    function (result) {
                        $rootScope.errorConexionNoticias = false;
                        deferred.resolve(result.data);
                    },
                    function(){
                        $rootScope.errorConexionNoticias = true;
                        deferred.resolve(null);
                    }
                );
            });
            return deferred.promise;
        };

        //Llamada AJAX al web service para recoger las incidencias de la pág web del CULM
        var getIncidencias = function () {
            var deferred = $q.defer();
            $timeout(function () {
                $http.get(URI + '/incidencias').then(
                    function (result) {
                        $rootScope.errorConexionIncidencias = false;
                        deferred.resolve(result.data);
                    },
                    function(){
                        $rootScope.errorConexionIncidencias = true;
                        deferred.resolve("");
                    }
                );
            });
            return deferred.promise;
        };

        //Llamada AJAX al web service para recoger las convocatorias examnes de Junio de la pág web del CULM
        var getExamenesJunio = function () {
            var deferred = $q.defer();
            $timeout(function () {
                $http.get(URI + '/examenesJunio').then(
                    function (result) {
                        $rootScope.errorConexionExJunio = false;
                        deferred.resolve(result.data);
                    },
                    function(){
                        $rootScope.errorConexionExJunio = true;
                        deferred.resolve(null);
                    }
                );
            });
            return deferred.promise;
        };

        //Llamada AJAX al web service para recoger las convocatorias de examens de Septiembre de la pág web del CULM
        var getExamenesSeptiembre = function () {
            var deferred = $q.defer();
            $timeout(function () {
                $http.get(URI + '/examenesSeptiembre').then(
                    function (result) {
                        $rootScope.errorConexionExSept = false;
                        deferred.resolve(result.data);
                    },
                    function(){
                        $rootScope.errorConexionExSept = true;
                        deferred.resolve(null);
                    }
                );
            });
            return deferred.promise;
        };
		
		
		//Llamada AJAX al web service para recoger los profesores segun el cuestionario
        var getProfesores = function (prof) {
            var deferred = $q.defer();
			var request = {
				method: 'POST',
				url: URI + '/profesores',
				contentType: 'application/json',
				dataType: "json",
				data: prof
			};
            $timeout(function () {
                $http(request).then(
                    function (result) {
                        deferred.resolve(result.data);
                    },
                    function(err){
                        console.log(err.status);
                        $rootScope.resultadoProfesoresError = true;
                        $ionicLoading.hide();
                    }
                );
            });
            return deferred.promise;
        };

        //Llamada AJAX al web service para recoger los horarios segun el formulario
        var getHorarios = function (prof) {
            var deferred = $q.defer();
            var request = {
                method: 'POST',
                url: URI + '/horarios',
                contentType: 'application/json',
                dataType: "json",
                data: prof
            };
            $timeout(function () {
                $http(request).then(
                    function (result) {
                        deferred.resolve(result.data);
                    },
                    function(err){
                        console.log(err.status);
                        $rootScope.resultadoHorariosError = true;
                        $ionicLoading.hide();
                    }
                );
            });
            return deferred.promise;
        };
		


        //Definición de las funciones anteriores para poder ser utilizadas
        return {
            getNoticias : getNoticias,
            getIncidencias : getIncidencias,
            getExamenesJunio: getExamenesJunio,
            getExamenesSeptiembre: getExamenesSeptiembre,
			getProfesores: getProfesores,
            getHorarios: getHorarios
        };
    });


    /**********************************************************************
     * AppCtrl: Controlador principal de la aplicación.
     ***********************************************************************/
    app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $window, $rootScope, GetInfoService, $state) {

        //Si no hay datos y no hay error de conexión --> Realiza las llamadas al web service
        if (!$rootScope.primerAcceso) {
            GetInfoService.getIncidencias().then(
                function(data){
                    incidencias = data;
                }
            );

            GetInfoService.getNoticias().then(
                function (data) {
                    noticias = data;
                    $rootScope.noticias = data;
                    $rootScope.incidencias = incidencias;
                    $rootScope.filteredNoticias = data;
                }
            );

            GetInfoService.getExamenesJunio().then(
                function(data){
                    examenesJunio = data;
                    $rootScope.examenesJunio = data;
                    $rootScope.filteredExJunio = data;
                }
            );

            GetInfoService.getExamenesSeptiembre().then(
                function(data){
                    examenesSeptiembre = data;
                    $rootScope.examenesSeptiembre= data;
                    $rootScope.filteredExSept = data;
                }
            );

            GetInfoService.getProfesores(profTodos).then(
                function (data) {
                    $rootScope.profesoresTodos = data;
                    if (data.length == 0){
                        $rootScope.resultadoProfesoresVacio = true;
                    }
                    $state.go('home');
                }
            );
        }
        //Popup para la descarga del calendario académico
        $scope.calendarioPopup = function() {
            var confirmPopup = $ionicPopup.confirm({
                template: '<div id="texto-popup"><strong>¿Desea descargar<br/>' +
                'el Calendario Académico?</strong><br/></div>' +
                '<img id="pdflogo" src="img/pdf-icon.png"/>',
                okText: 'SÍ',
                cancelText: 'NO'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $window.open(calendario_URI, '_system');
                } 
            });
        };

        //Función que refresca toda la información de la aplicación
        $scope.reloadInfo = function(){
            GetInfoService.getIncidencias().then(
                function(data){
                    incidencias = data;
                    $scope.incidencias = data;
                }
            );
            GetInfoService.getNoticias().then(
                function (data) {
                    noticias = data;
                    $rootScope.noticias = data;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
            GetInfoService.getExamenesJunio().then(
                function(data){
                    examenesJunio = data;
                    $rootScope.examenesJunio = data;
                }
            );
            GetInfoService.getExamenesSeptiembre().then(
                function(data){
                    examenesSeptiembre = data;
                    $rootScope.examenesSeptiembre= data;
                }
            );
            GetInfoService.getProfesores(profTodos).then(
                function (data) {
                    $rootScope.profesoresTodos = data;
                    if (data.length == 0){
                        $rootScope.resultadoProfesoresVacio = true;
                    }
                }
            );
        };

        $scope.notClickedZaragoza = function(){
            $rootScope.clickZaragoza = false;
        }
    });


    /**************************************************************************
     * TopCtrl: Controlador encargado de redirigir la aplicación a la pantalla
     *          de splash en caso de refresco de página
     ***********************************************************************/
    app.controller('TopCtrl', function($location){
       $location.path("/");
        noticias = [];
        incidencias= [];
        examenesJunio = [];
        examenesSeptiembre = [];
    });


    /**************************************************************************
     * NoticiasCtrl: Controlador encargado de la sección de noticias
     ***********************************************************************/
    app.controller('NoticiasCtrl', function($scope, $rootScope, $stateParams, $http, $filter, GetInfoService) {

        //Inicialización de variables
            $scope.query = "";
            $rootScope.noticias = noticias;
            $scope.noticia = noticias[$stateParams.noticiaId];
            $rootScope.filteredNoticias = noticias;
            $scope.pageSize = 10;

        //Función que filtra las noticias para la búsqueda
        $scope.filterNoticias =  function(query) {
            $rootScope.filteredNoticias = $filter('filter')($rootScope.noticias, query);
        };

        //Función que recarga las noticias con el scroll superior --> realiza de nuevo la llamada al web service
        $scope.reloadNews = function(){
            GetInfoService.getNoticias().then(
                function (data) {
                    $rootScope.noticias = data;
                    $rootScope.filteredNoticias = data;
                    $scope.query = "";
                    $scope.pageSize=10;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        //Función que carga más noticias con el scroll inferior
        $scope.loadMoreNews = function(){
            $scope.pageSize += 5;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        //Función que limpia una búsqueda, mostrando de nuevo todas las noticias
        $scope.clearSearch = function(){
            $rootScope.filteredNoticias = noticias;
        };
    });


    /**************************************************************************
     * IncidenciasCtrl: Controlador encargado de la sección de incidencias
     ***********************************************************************/
    app.controller('IncidenciasCtrl', function($scope, $rootScope, $stateParams, $http, $filter, GetInfoService) {

        //Inicialización de variables
        $rootScope.incidencias = incidencias;
        $scope.incidencia = incidencias[$stateParams.incidenciaId];

        //Función que recarga las incidencias con el scroll superior --> realiza de nuevo la llamada al web service
        $scope.reloadIncidencias = function(){
            GetInfoService.getIncidencias().then(
                function (data) {
                    $rootScope.incidencias = data;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };
    });


    /***********************************************************************************************
     * examenesJunioCtrl: Controlador encargado de la sección de convocatorias de exámenes de Junio
     ***********************************************************************************************/
    app.controller('examenesJunioCtrl', function($scope, $rootScope,$ionicPopup, $http, $filter, GetInfoService) {

        $rootScope.examenesJunio = examenesJunio;

        //Función que filtra la búsqueda de convocatorias
        $scope.filterExamenes =  function(query) {
            $rootScope.filteredExJunio = $filter('filter')($rootScope.filteredExJunio, query);
        };

        //Función que limpia una búsqueda
        $scope.clearSearch = function(){
            $rootScope.filteredExJunio = examenesJunio;
        };

        //Función que recarga las convocatorias con el scroll superior --> realiza de nuevo la llamada al web service
        $scope.reloadExJunio = function(){
            GetInfoService.getExamenesJunio().then(
                function (data) {
                    $rootScope.examenesJunio = data;
                    $rootScope.filteredExJunio = data;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };
    });


    /*********************************************************************************************************
     * examenesSeptiembreCtrl: Controlador encargado de la sección de convocatorias de exámenes de Septiembre
     *********************************************************************************************************/
    app.controller('examenesSeptiembreCtrl', function($scope, $rootScope, $ionicPopup, $http, $filter, GetInfoService) {

        $rootScope.examenesSeptiembre = examenesSeptiembre;

        //Función que filtra la búsqueda de convocatorias
        $scope.filterExamenes =  function(query) {
            $rootScope.filteredExSept = $filter('filter')($rootScope.examenesSeptiembre, query);
        };

        //Función que limpia una búsqueda
        $scope.clearSearch = function(){
            $rootScope.filteredExSept = examenesSeptiembre;
        };

        //Función que recarga las convocatorias con el scroll superior --> realiza de nuevo la llamada al web service
        $scope.reloadExSept = function(){
            GetInfoService.getExamenesSeptiembre().then(
                function (data) {
                    $rootScope.examenesSeptiembre = data;
                    $rootScope.filteredExSept = data;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };
    });
	
	
	/*********************************************************************************************************
     * profesoresCtrl: Controlador encargado de la sección de busqueda de profesores
     *********************************************************************************************************/
    app.controller('profesoresCtrl', function($scope, $rootScope, $ionicLoading, GetInfoService, $timeout) {

		$scope.nombre = "";
		$scope.apel1 = "";
		$scope.apel2 = "";
		$scope.centro = "";
		$scope.campus = "";
		$scope.seccion = "";
        $rootScope.resultadoProfesoresVacio = false;
        $rootScope.resultadoProfesoresError = false;
        $scope.seccionTodos = seccionTodos;
		$scope.pageSize = 10;

        $scope.cleanProfesores = function(){
            $rootScope.profesores = "";
        };

		$scope.search = function (nombre, apel1, apel2, centro, campus, seccion) {

            $ionicLoading.show({
                template: 'Buscando...<br><i class="ion-loading-d"></i>',
                animation: 'fade-in',
                showBackdrop: false
            });

			var prof = JSON.stringify({
							nombre: nombre,
							primerApellido: apel1,
							segundoApellido: apel2,
							despacho: null,
							centro: centro,
							campus: campus,
							seccion: seccion,
							extension: null,
							mail: null,
							tutorias: null,
                            web: null
						});
						
			GetInfoService.getProfesores(prof).then(
                function (data) {
                    $ionicLoading.hide();
						$rootScope.profesores = data;
                        if (data.length == 0){
                            $rootScope.resultadoProfesoresVacio = true;
                        }
                }
            );
		};
		
		//Función que carga más profesores con el scroll inferior
        $scope.loadMoreProfesores = function(){
            $scope.pageSize += 5;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
		
		$scope.loadProf = function(prof){
            if (typeof prof.campus == 'undefined') $rootScope.campusProfVacio=true;
            if (typeof prof.despacho == 'undefined')  $rootScope.despachoProfVacio=true;
            if (typeof prof.tutorias == 'undefined')  $rootScope.tutoriasProfVacio=true;
            if (typeof prof.mail == 'undefined')  $rootScope.mailProfVacio=true;
            if (typeof prof.extension == 'undefined')  $rootScope.extensionProfVacio=true;
            if (typeof prof.web == 'undefined')  $rootScope.webProfVacio=true;
            $rootScope.profesor = prof;
		};

        $scope.resetHideProfVars = function(){
            $timeout(function(){
                $rootScope.campusProfVacio=$rootScope.despachoProfVacio=$rootScope.tutoriasProfVacio=
                    $rootScope.mailProfVacio=$rootScope.extensionProfVacio=$rootScope.webProfVacio=false;
            }, 500);
        };
    });

    /*********************************************************************************************************
     * horariosCtrl: Controlador encargado de la sección de busqueda de profesores
     *********************************************************************************************************/
    app.controller('horariosCtrl', function($scope, $rootScope, $ionicLoading, GetInfoService, $timeout) {

        $scope.idioma = "";
        $scope.curso = "";
        $scope.centro = "";
        $scope.campus = "";
        $scope.matricula = "";
        $scope.seccion = "";
        $scope.profesor = "";
        $scope.dias = "";
        $scope.aula = "";
        $scope.edificio = "";
        $scope.nivel = "";
        $rootScope.resultadoHorariosVacio = false;
        $rootScope.resultadoHorariosError = false;
        $scope.pageSize = 10;
        $scope.seccionTodos = seccionTodos;
        $scope.edificioTodos = edificioTodos;

        $scope.cleanHorarios = function(){
          $rootScope.horarios = "";
        };

        $scope.search = function (centro, campus, matricula, seccion, profesor, nivel, dias, aula, edificio) {

            $ionicLoading.show({
                template: 'Buscando...<br><i class="ion-loading-d"></i>',
                animation: 'fade-in',
                showBackdrop: false
            });

            var horario = JSON.stringify({
                centro: centro,
                campus: campus,
                tipoMatricula: matricula,
                seccion: seccion,
                profesor: profesor,
                nivel: nivel,
                dias: dias,
                aula: aula,
                edificio: edificio,
                horario: $rootScope.horarioValue
            });

            GetInfoService.getHorarios(horario).then(
                function (data) {
                    $ionicLoading.hide();
                    $rootScope.horarios = data;
                    if (data.length == 0){
                        $rootScope.resultadoHorariosVacio = true;
                    }
                }
            );
        };

        //Función que carga más profesores con el scroll inferior
        $scope.loadMoreHorarios = function(){
            $scope.pageSize += 5;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.loadHorario = function(hor){
            if (typeof hor.profesor == 'undefined') $rootScope.profesorHorVacio=true;
            if (typeof hor.curso == 'undefined')  $rootScope.cursoHorVacio=true;
            if (typeof hor.horario == 'undefined')  $rootScope.horarioHorVacio=true;
            if (typeof hor.dias == 'undefined')  $rootScope.diasHorVacio=true;
            if (typeof hor.aula == 'undefined')  $rootScope.aulaHorVacio=true;
            if (typeof hor.edificio == 'undefined')  $rootScope.edificioHorVacio=true;
            if (typeof hor.tipoMatricula == 'undefined')  $rootScope.tipoMatriculaHorVacio=true;
            $rootScope.horario = hor;
        };

        $scope.resetHideHorVars = function(){
            $timeout(function(){
                $rootScope.profesorHorVacio=$rootScope.cursoHorVacio=$rootScope.horarioHorVacio=
                    $rootScope.diasHorVacio=$rootScope.aulaHorVacio=$rootScope.edificioHorVacio=
                        $rootScope.tipoMatriculaHorVacio=false;
            }, 500);
        };
    });

    /*********************************************************************************************************
     * horarioRangeCtrl: Controlador encargado del input de tipo "range" para la selección de horarios en el
     *                   formulario de búsqueda de horarios
     *********************************************************************************************************/
    app.controller("horarioRangeCtrl", function($scope, $rootScope, $element, $interval) {
        $scope.min = 0;
        $scope.max = horariosValores.length-1;
        $scope.horarioModelValue = 0;

        $interval(function() {
            $rootScope.horarioValue = horariosValores[$element.find('input').val()];
        });
    });

    /*********************************************************************************************************
     * infoSanFranciscoCtrl: Controlador encargado de la sección de información de campus San Francisco
     *********************************************************************************************************/
    app.controller('infoSanFranciscoCtrl', function($scope, $rootScope, $ionicPopup, $http, $filter, GetInfoService) {

        var MIN_ZOOM = 15;
        var INIT_ZOOM = 17;
        var MAX_ZOOM = 18;

        //San Francisco
        var SANF_LAT = 41.642305;
        var SANF_LON = -0.897683;

        var map = L.map('map-sanfrancisco').setView([SANF_LAT, SANF_LON], INIT_ZOOM);
      
        map.attributionControl.setPrefix('');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM
        }).addTo(map);

        L.marker([SANF_LAT, SANF_LON]).addTo(map)
            .bindPopup("<div class=\"text-center\"><b>Campus San Francisco</b><br>C/Pedro Cerbuna, 12</div>");

        var popup = L.popup();
    });
  
    /*********************************************************************************************************
     * infoRioEbroCtrl: Controlador encargado de la sección de información de campus Río Ebro
     *********************************************************************************************************/
    app.controller('infoRioEbroCtrl', function($scope, $rootScope, $ionicPopup, $http, $filter, GetInfoService) {

        var MIN_ZOOM = 15;
        var INIT_ZOOM = 17;
        var MAX_ZOOM = 18;

        //Rio Ebro
        var RIO1_LAT = 41.683029;
        var RIO1_LON = -0.883228;

        var map = L.map('map-rioebro1').setView([RIO1_LAT, RIO1_LON], INIT_ZOOM);        
        map.attributionControl.setPrefix('');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM
        }).addTo(map);

        L.marker([RIO1_LAT, RIO1_LON]).addTo(map)
            .bindPopup("<div class=\"text-center\"><b>Campus Rio Ebro, Betancourt</b><br>C/María de Luna, s/n</div>");

        var popup = L.popup();

        var RIO2_LAT = 41.681527;
        var RIO2_LON = -0.883861;

        var map2 = L.map('map-rioebro2').setView([RIO2_LAT, RIO2_LON], INIT_ZOOM);
        map2.attributionControl.setPrefix('');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM
        }).addTo(map2);

        L.marker([RIO2_LAT, RIO2_LON]).addTo(map2)
            .bindPopup("<div class=\"text-center\"><b>Campus Rio Ebro, Lorenzo Normante</b><br>C/María de Luna, s/n</div>");

        var popup = L.popup();
    });
  
  /*********************************************************************************************************
   * infoGranViaCtrl: Controlador encargado de la sección de información de Campus Gran Vía
     *********************************************************************************************************/
    app.controller('infoGranViaCtrl', function($scope, $rootScope, $ionicPopup, $http, $filter, GetInfoService) {

        var MIN_ZOOM = 15;
        var INIT_ZOOM = 17;
        var MAX_ZOOM = 18;

        //Gran Vía
        var GRAN_LAT = 41.647673;
        var GRAN_LON = -0.887874;

        var map = L.map('map-granvia').setView([GRAN_LAT, GRAN_LON], INIT_ZOOM);
        map.attributionControl.setPrefix('');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM
        }).addTo(map);

        L.marker([GRAN_LAT, GRAN_LON]).addTo(map)
            .bindPopup("<div class=\"text-center\"><b>Campus Gran Vía, Facultad Económicas</b><br>C/Doctor Cerrada, 1-3</div>");

        var popup = L.popup();
    });
  
    /*********************************************************************************************************
     * infoVeterinariaCtrl: Controlador encargado de la sección de información de Campus Veterinaria
     *********************************************************************************************************/
    app.controller('infoVeterinariaCtrl', function($scope, $rootScope, $ionicPopup, $http, $filter, GetInfoService) {

        var MIN_ZOOM = 15;
        var INIT_ZOOM = 17;
        var MAX_ZOOM = 18;

        //Veterinaria
        var VET_LAT = 41.634882;
        var VET_LON = -0.861936;

        var map = L.map('map-veterinaria').setView([VET_LAT, VET_LON], INIT_ZOOM);
        map.attributionControl.setPrefix('');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM
        }).addTo(map);

        L.marker([VET_LAT, VET_LON]).addTo(map)
            .bindPopup("<div class=\"text-center\"><b>Campus Veterinaria, Hospital Clínico</b><br>1ª planta, pasillo Admón. de Patología</div>");

        var popup = L.popup();
    });
  
    /*********************************************************************************************************
     * infoHuescaCtrl: Controlador encargado de la sección de información de Huesca
     *********************************************************************************************************/
    app.controller('infoHuescaCtrl', function($scope, $rootScope, $ionicPopup, $http, $filter, GetInfoService) {

        var MIN_ZOOM = 15;
        var INIT_ZOOM = 17;
        var MAX_ZOOM = 18;

        //San Francisco
        var HUE_LAT = 42.142172;
        var HUE_LON = -0.405557;

        var map = L.map('map-huesca').setView([HUE_LAT, HUE_LON], INIT_ZOOM);
        map.attributionControl.setPrefix('');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM
        }).addTo(map);

        L.marker([HUE_LAT, HUE_LON]).addTo(map)
            .bindPopup("<div class=\"text-center\"><b>Campus Huesca</b><br>Ronda Misericordia, 5</div>");

        var popup = L.popup();
    });

    /*********************************************************************************************************
     * infoTeruelCtrl: Controlador encargado de la sección de información de Teruel
     *********************************************************************************************************/
    app.controller('infoTeruelCtrl', function($scope, $rootScope, $ionicPopup, $http, $filter, GetInfoService) {

        var MIN_ZOOM = 15;
        var INIT_ZOOM = 17;
        var MAX_ZOOM = 18;

        //San Francisco
        var TER_LAT = 40.351661;
        var TER_LON = -1.110081;

        var map = L.map('map-teruel').setView([TER_LAT, TER_LON], INIT_ZOOM);
        map.attributionControl.setPrefix('');

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: MIN_ZOOM,
            maxZoom: MAX_ZOOM
        }).addTo(map);

        L.marker([TER_LAT, TER_LON]).addTo(map)
            .bindPopup("<div class=\"text-center\"><b>Vicerrectorado Campus Teruel</b><br>C/Ciudad Escolar, s/n</div>");

        var popup = L.popup();
    });

    //StartFrom filter for the pagination
    app.filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
})();
