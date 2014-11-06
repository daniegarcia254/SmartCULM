(function(){

    var app = angular.module('starter.controllers', []);

    var URI = 'http://localhost:8080/com.gps.smartculm/rest/smartculm-service';

    app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    })

    .controller('NoticiasCtrl', function($scope, $http) {
            $scope.mydata = [{"fecha":"",
                              "href":"javascript: void(0)",
                              "info":[{"descripcion":"Cargando noticias...",
                                       "uri":""}],
                              "id":1,"nextId":2}];

            $http.get(URI + '/noticias').then(function(result) {
                console.log(result);
                $scope.mydata = result.data;
            });
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
