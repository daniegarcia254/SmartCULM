(function(){
    var app = angular.module('starter.controllers',[]);
  
    //var URI = 'http://localhost:8080/com.gps.smartculm/rest/smartculm-service';
    //var URI = 'http://smartculm-danie.rhcloud.com/rest/smartculm-service';
    var URI = 'http://smartculm-gps25.rhcloud.com/rest/smartculm-service';
    var calendario_URI = "https://culm.unizar.es/sites/culm.unizar.es/files/users/adminwebuz/normativa/calendario.pdf";

    //Inicialización de variables globales donde se guardan los datos recogidos
    var noticias = [];
    var incidencias = [];
    var examenesJunio = [];
    var examenesSeptiembre = [];

    /**********************************************************************
     * FACTORY: Servicio que define todas las llamadas al web service para recoger los datos
     ***********************************************************************/
    app.factory('GetInfoService', function($http, $q, $timeout, $ionicPopup, $state, $rootScope) {

        //Llamada AJAX al web service para recoger las noticias de la pág web del CULM
        var getNoticias = function () {
            var deferred = $q.defer();
            $timeout(function () {
                $http.get(URI + '/noticias').then(
                    function (result) {
                        $rootScope.errorConexion = false;
                        deferred.resolve(result.data);
                    },
                    function(){
                        $rootScope.errorConexion = true;
                        $ionicPopup.confirm({
                            template: '<img id="warning" src="/img/warning.png"/><br>' +
                            '<div id="texto-popup"><strong>Ha ocurrido un error<br/>' +
                            'en la conexión con el servidor</strong><br/>' +
                            '<br>Por favor, recarge la página para reintentar la conexión</div>',
                            buttons: [{
                                text: 'CONTINUAR',
                                type: 'button-positive',
                                onTap: function() {
                                    $state.go('home');
                                }
                            }]
                        });
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
                        deferred.resolve(result.data);
                    },
                    function(err){
                        console.log(err.status);
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
                        deferred.resolve(result.data);
                    },
                    function(err){
                        console.log(err.status);
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
                        deferred.resolve(result.data);
                    },
                    function(err){
                        console.log(err.status);
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
            getExamenesSeptiembre: getExamenesSeptiembre
        };
    });


    /**********************************************************************
     * AppCtrl: Controlador principal de la aplicación.
     ***********************************************************************/
    app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup, $window, $rootScope, GetInfoService, $state) {

        //Si no hay datos y no hay error de conexión --> Realiza las llamadas al web service
        if (noticias.length == 0 && !$rootScope.errorConexion) {
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
                    $state.go('home');
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
        }

        //Popup para la descarga del calendario académico
        $scope.calendarioPopup = function() {
            var confirmPopup = $ionicPopup.confirm({
                template: '<div id="texto-popup"><strong>¿Desea descargar<br/>' +
                'el Calendario Académico?</strong><br/></div>' +
                '<img id="pdflogo" src="/img/pdf-icon.png"/>',
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
        };
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
    app.controller('examenesJunioCtrl', function($scope, $rootScope,$ionicPopup, $http, $filter) {

        $rootScope.examenesJunio = examenesJunio;

        //Si no hay convocatorias --> Popup informativo
        if ($rootScope.examenesJunio.length == 0){
            $ionicPopup.confirm({
                template: '<img id="info" src="/img/info.ico"/><br>' +
                '<div id="texto-popup"><strong>Las convocatorias de Junio NO<br/>' +
                'han sido publicadas todavía</strong><br/></div>',
                buttons: [{
                    text: 'OK',
                    type: 'button-positive'
                }]
            });
        }

        //Función que filtra la búsqueda de convocatorias
        $scope.filterExamenes =  function(query) {
            $rootScope.filteredExJunio = $filter('filter')($rootScope.filteredExJunio, query);
        };

        //Función que limpia una búsqueda
        $scope.clearSearch = function(){
            $rootScope.filteredExJunio = examenesJunio;
        };
    });


    /*********************************************************************************************************
     * examenesSeptiembreCtrl: Controlador encargado de la sección de convocatorias de exámenes de Septiembre
     *********************************************************************************************************/
    app.controller('examenesSeptiembreCtrl', function($scope, $rootScope, $ionicPopup, $http, $filter) {

        $rootScope.examenesSeptiembre = examenesSeptiembre;

        //Si no hay convocatorias --> Popup informativo
        if ($rootScope.examenesSeptiembre.length == 0){
            $ionicPopup.confirm({
                template: '<img id="info" src="/img/info.ico"/><br>' +
                '<div id="texto-popup"><strong>Las convocatorias de Septiembre NO<br/>' +
                'han sido publicadas todavía</strong><br/></div>',
                buttons: [{
                    text: 'OK',
                    type: 'button-positive'
                }]
            });
        }

        //Función que filtra la búsqueda de convocatorias
        $scope.filterExamenes =  function(query) {
            $rootScope.filteredExSept = $filter('filter')($rootScope.examenesSeptiembre, query);
        };

        //Función que limpia una búsqueda
        $scope.clearSearch = function(){
            $rootScope.filteredExSept = examenesSeptiembre;
        };

    });



    //StartFrom filter for the pagination
    app.filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
})();
