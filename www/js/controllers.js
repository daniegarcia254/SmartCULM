(function(){

    var app = angular.module('starter.controllers',[]);

    //var URI = 'http://localhost:8080/com.gps.smartculm/rest/smartculm-service';
    var URI = 'http://smartculm-danie.rhcloud.com/rest/smartculm-service';

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
                template: 'Cargando Noticias e Incidencias',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200
            });

            GetInfoService.getIncidencias().then(
                function(data){
                    console.log(data);
                    incidencias = data;
                }
            );
            GetInfoService.getNoticias().then(
                function (data) {
                    console.log(data);
                    noticias = data;
                    $scope.noticias = data;
                    $scope.incidencias = incidencias;
                    $ionicLoading.hide();
                }
            );
        };

        $scope.reloadInfo = function(){
            GetInfoService.getIncidencias().then(
                function(data){
                    console.log(data);
                    incidencias = data;
                    $scope.incidencias = data;
                }
            );
            GetInfoService.getNoticias().then(
                function (data) {
                    console.log(data);
                    noticias = data;
                    $scope.noticias = data;
                    $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };
    });



    app.controller('NoticiasCtrl', function($scope, $rootScope, $http, $filter, GetInfoService) {
            $scope.numberOfPages=function(){
                return Math.ceil($scope.filteredNoticias.length/$scope.pageSize);
            };

            $scope.filterNoticias =  function(query) {
                $scope.filteredNoticias = $filter('filter')($scope.noticias, query);
                $scope.noOfPages = $scope.numberOfPages();
            };

            $scope.query = "";
            $scope.noticias = noticias;
            $scope.filteredNoticias = noticias;
            $scope.pageSize = 6;
            $rootScope.hidePagBtns = false;
            $scope.currentPage = 0;
            $scope.noOfPages = $scope.numberOfPages();



            $scope.reloadNews = function(){
                if ($scope.currentPage == 0) {
                    GetInfoService.getNoticias().then(
                        function (data) {
                            console.log(data);
                            $scope.noticias = data;
                            $scope.filteredNoticias = data;
                            $rootScope.hidePagBtns = false;
                            $scope.noOfPages = $scope.numberOfPages();
                            $scope.query = "";
                            $scope.$broadcast('scroll.refreshComplete');
                        }
                    );
                };
            };
    });


    app.controller('IncidenciasCtrl', function($scope, $rootScope, $http, $filter, GetInfoService) {

        $scope.incidencias = incidencias;

        $scope.reloadIncidencias = function(){
            GetInfoService.getIncidencias().then(
                function (data) {
                    $scope.incidencias = data;
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
