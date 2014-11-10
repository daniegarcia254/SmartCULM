(function(){

    var app = angular.module('starter.controllers', []);

    var URI = 'http://localhost:8080/com.gps.smartculm/rest/smartculm-service';

    var noticias = [];

    app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    });

    app.factory('NoticiasService', function($http, $q, $timeout) {

        var getNoticias = function() {

            var deferred = $q.defer();
            $timeout( function(){
                $http.get(URI + '/noticias').then(function(result) {
                    console.log(result);
                    //$scope.mydata = result.data;
                    deferred.resolve(result.data);
                });
            });

            return deferred.promise;
        };

        return {
            getNoticias : getNoticias
        };
    });

    app.controller('NoticiasCtrl', function($scope, $http, $ionicLoading, NoticiasService) {

            $scope.loadingIndicator = $ionicLoading.show({
                template: 'Cargando Noticias...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200
            });
            NoticiasService.getNoticias().then(
                function(data) {
                    console.log(data);
                    $scope.noticias = data;
                    $ionicLoading.hide();
                }
            );

            $scope.loadMore = function() {
                var last = $scope.noticias[$scope.noticias.length - 1];
                for (var i=1; i <= 5; i++){
                    $scope.noticias.push(last + i);
                }
            };
    });

    app.controller('IncidenciasCtrl', function($scope) {
        $scope.incidencias = [
            { title: 'Incidencia 1', id: 1 },
            { title: 'Incidencia 2', id: 2 },
            { title: 'Incidencia 3', id: 3 },
            { title: 'Incidencia 4', id: 4 },
            { title: 'Incidencia 5', id: 5 },
            { title: 'Incidencia 6', id: 6 }
        ];
    });
})();
