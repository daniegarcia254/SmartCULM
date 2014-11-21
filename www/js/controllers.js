(function(){
    var app = angular.module('starter.controllers',[]);
  
    //var URI = 'http://localhost:8080/com.gps.smartculm/rest/smartculm-service';
    //var URI = 'http://smartculm-danie.rhcloud.com/rest/smartculm-service';
    var URI = 'http://smartculm-gps25.rhcloud.com/rest/smartculm-service';
    
    var noticias = [];
    var incidencias = [];

    app.factory('GetInfoService', function($http, $q, $timeout) {

        var getNoticias = function () {

            var deferred = $q.defer();
            $timeout(function () {
                $http.get(URI + '/noticias').then(function (result) {
                    deferred.resolve(result.data);
                });
            });
            return deferred.promise;
        };

        var getIncidencias = function () {

            var deferred = $q.defer();
            $timeout(function () {
                $http.get(URI + '/incidencias').then(function (result) {
                    console.log(result.data);
                    deferred.resolve(result.data);
                });
            });
            return deferred.promise;
        };

        return {
            getNoticias : getNoticias,
            getIncidencias : getIncidencias
        };
    });


    app.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $rootScope, GetInfoService) {

        if (noticias.length == 0) {
          
            $scope.loadingIndicator = $ionicLoading.show({
                templateUrl: 'templates/splash.html',
                animation: 'fade-in',
                showBackdrop: false        
            });

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
                    $ionicLoading.hide();
                }
            );
        };

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
        };
    });



    app.controller('NoticiasCtrl', function($scope, $rootScope, $stateParams, $http, $filter, GetInfoService) {

            $scope.filterNoticias =  function(query) {
                $rootScope.filteredNoticias = $filter('filter')($rootScope.noticias, query);
            };

            $scope.query = "";
            $rootScope.noticias = noticias;
            $scope.noticia = noticias[$stateParams.noticiaId];
            $rootScope.filteredNoticias = noticias;
            $scope.pageSize = 10;

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

            $scope.loadMoreNews = function(){
                $scope.pageSize += 5;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }

            $scope.clearSearch = function(){
              $rootScope.filteredNoticias = noticias;
            };
    });


    app.controller('IncidenciasCtrl', function($scope, $rootScope, $stateParams, $http, $filter, GetInfoService) {
        $rootScope.incidencias = incidencias;
        $scope.incidencia = incidencias[$stateParams.incidenciaId];

        $scope.reloadIncidencias = function(){
            GetInfoService.getIncidencias().then(
                function (data) {
                    $rootScope.incidencias = data;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
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
