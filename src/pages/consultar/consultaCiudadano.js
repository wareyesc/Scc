angular.module('ConsultarPage.pages.consultar')
      .controller('Ciudadano', ConsumoCiudadano);

      function ConsumoCtrl($scope, $http){
        var urlciudadano='http://54.224.238.170:8090/registraduria/ciudadanos/';

        $scope.cargarCiudadano = function(){
            console.log("hola mundo");
            $http.get(urlciudadano).success(function(listaCiudadano){
              console.log(listaCiudadano);
              $scope.lista_ciu=listaCiudadano;
            });
          };
      }
