'use strict'
app.controller('TudoController', ['$scope', '$rootScope', 'cidades', 'config', 'blumenau', 'favoritaCid',
function($scope, $rootScope, cidades, config, blumenau, favoritaCid) {
  var menEstado = "Selecione corretamente um estado e uma cidade.";
  $scope.estados = cidades.estados;
  $scope.loades = false;
//  var favoritErr = false;
//pegar no cache caso exista a cidade favorita 
   $rootScope.$on('favorita', function(event, data) {
     if(data) {
       $scope.temFavorita = true;
       $scope.cidadeFavorita = data.cidade;
       $scope.estadoFavorita = data.estado;
     } else {
       $scope.cidadeFavorita= null;
       $scope.estadoFavorita = null;
       $scope.cbFavorita = false;
       $scope.temFavorita = false;
     }
   });

  //Procurar o dia com temperatura máxima e mínima

  var maxAndMin = function() {
    var max = {temperatura_max: null};
    var min = {temperatura_min: 100};
    $scope.weatherInfo.list.forEach(function(pr) {
      var data = new Date(pr.dt * 1000);
      if (pr.temp.max > max.temperatura_max) {
        max.temperatura_max = pr.temp.max;
        max.data = data;
      }
      if (pr.temp.min < min.temperatura_min) {
        min.temperatura_min = pr.temp.min;
        min.data = data;
      }
    });
    $scope.maxima = max;
    $scope.minima = min;
  }
  // verifica dia de ceu claro e recomenta atividade para o final de semana
  var Recomendacao = function() {
    $scope.recomendacao = false;
    $scope.weatherInfo.list.some(function(pr) {
      var data = new Date(pr.dt * 1000);
      if (data.toString().split(" ")[0].indexOf("Sun") > -1) {// 
        $scope.sunday = {
          temperatura_max: pr.temp.max,
          descricao: pr.weather[0].description,
          data: data
        }
        if ((pr.weather[0].description.indexOf("céu claro") > -1 && (pr.temp.max > 25))) {// if descricao tiver 'ceu claro' e temp for maior de 25 recomenda para find
          $scope.recomendacao = true;
        }
        return true;
      }
    });
  }
  //setas valores no grafico
  var chartConfig = function() {
    var labels = [];
    var min = [];
    var max = [];
    $scope.series = ['Máxima', 'Mínima'];
    $scope.weatherInfo.list.forEach(function(pr) {
      var data = new Date(pr.dt * 1000);
      labels.push(data.toString().split(" ")[0]); //Mostra os dias 
      min.push(pr.temp.min);
      max.push(pr.temp.max);
    });
    $scope.labels = labels;
    $scope.data = [max, min];
  }
  //Função chamada por ng-click para consultar e mostrar tempo para uma cidade específica 
  $scope.mostraWeather = function(){
    $scope.weatherInfo = false; 
    $scope.messageErro = false; 
    //return erro
    if(!$scope.estado || !$scope.nomeCidade) {
        $scope.messageErro = menEstado;
        return;
    }
    $scope.loades = true; //espera o loader na página.
    config.consult($scope.nomeCidade, $scope.estado.sigla)
    .then(function(result) {
      var arr = [];
      result.data.list.forEach(function(e){
        var dt = new Date(e.dt * 1000);
        arr.push({
          data: dt,
          descricao: e.weather[0].description,
          imagem: e.weather[0].icon,
          temperatura_min: e.temp.min,
          temperatura_max: e.temp.max
        });
      });
      result.data.previsoes = arr;
      $scope.weatherInfo = result.data;
      $scope.loades = false;
      maxAndMin();
      Recomendacao();
      chartConfig();
      if($scope.cbFavorita) 
        favoritaCid.setData(result.data);
    },
    function(err) {
        $scope.messageErro = "Não foi possível obter as informações de tempo para a cidade desejada."
        $scope.loades = false;
    });
  }
  //seta a cidade favorita
  var carregaFavorita = function(favorita) {
    //carrega cidade favorita
    var favorita = favoritaCid.getFavorite();
    $scope.estados.some(function(st) {
      if (st.sigla.indexOf(favorita.estado) > -1) {
        $scope.estado = st;
        return true;
      }
    });
    $scope.estado.cidades.some(function(ct) {
      if(ct.indexOf($scope.cidadeFavorita) > -1) {
        $scope.nomeCidade = ct;
        $scope.cbFavorita = true;
        return true;
      }
    });
    $scope.mostraWeather(); //Carrega as informações da temperatura  cidade favorita
  }
  //carrega primeiro na página
  carregaFavorita();

  //remove  a cidade favorita
  $scope.removeFavorita = function() {
    favoritaCid.removeFavorita();
  }
  // Salva uma nova cidade no  localStorage 
  $scope.guardaFavorita = function() {
    $scope.messageErro = false; 
    if(!$scope.cbFavorita)
      return;
    if (!$scope.nomeCidade || !$scope.estado) {
      favoriteErr = true;
      $scope.messageErro = menEstado;
      return;
    }
    favoritaCid.guardaFavorita({cidade: $scope.nomeCidade, estado: $scope.estado.sigla});
  }

  //Fecha as possiveis mensagens de erro 
  $scope.fechaErro = function() {
    if (favoriteErr) {
      $scope.cbFavorita = false;
      favoriteErr = false;
    }
    $scope.messageErro = false;
  }
}]);
