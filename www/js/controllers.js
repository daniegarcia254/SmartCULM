angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('NoticiasCtrl', function($scope) {
  $scope.noticias = [
    { title: 'Noticia 1', id: 1 },
    { title: 'Noticia 2', id: 2 },
    { title: 'Noticia 3', id: 3 },
    { title: 'Noticia 4', id: 4 },
    { title: 'Noticia 5', id: 5 },
    { title: 'Noticia 6', id: 6 }
  ];
})

.controller('NoticiasCtrl', function($scope, $stateParams) {
})

.controller('IncidenciasCtrl', function($scope) {
    $scope.incidencias = [
        { title: 'Incidencia 1', id: 1 },
        { title: 'Incidencia 2', id: 2 },
        { title: 'Incidencia 3', id: 3 },
        { title: 'Incidencia 4', id: 4 },
        { title: 'Incidencia 5', id: 5 },
        { title: 'Incidencia 6', id: 6 }
    ];
})

.controller('IncidenciasCtrl', function($scope, $stateParams) {
});

