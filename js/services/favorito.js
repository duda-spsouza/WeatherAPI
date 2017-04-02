'use strict';
app.factory('favoritaCid', ['$rootScope', 'blumenau', function($rootScope, blumenau){
  var defFavorita = {cidade: blumenau.nome, estado: blumenau.sigla};
  var favorita = angular.fromJson(localStorage.getItem('favorita')) || defFavorita;
  var PegaFavorita = function(fav){
    if(!fav) //se for null remove cidade favorita existente
      return Remove();
    if(!fav.cidade || !fav.estado) {
      console.error('Cidade favorita inválida');
      $rootScope.$emit('favorita', null);
      return;
    }
    localStorage.setItem('favorita', angular.toJson(fav));
    favorita = fav;
    $rootScope.$emit('favorita', favorita);
  }
  //salva em cache a cidade favorita setando a data atual adicionando mais 8 horas 
  var PegaData = function(data) {
    var dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() + 8); //adiciona 8 horas
    favorita.dataAtual = dataAtual;
    favorita.data = data;
    PegaFavorita(favorita);
  }
  //recupera da cidade favorita
  var RecuperaCid = function() {
    $rootScope.$emit('favorita', favorita);
    return favorita;
  }
  // Remove a cidade favorita 
  var Remove = function() {
    localStorage.removeItem('favorita');
    favorita = null;
    $rootScope.$emit('favorita', null);
  }
  // usa os dados da  cidade favorita
  var UsaDados = function(cidade, estado) {
    if (cidade === defFavorita.cidade && estado === defFavorita.estado) {
      return blumenau;
    } else if (cidade === favorita.cidade && estado === favorita.estado) {
      var agora = new Date();
      var valid = new Date(favorita.valid);
      return (valid && agora <= valid) ? favorita.data : null;
    }
    return null;
  }

  return {
    guardaFavorita: PegaFavorita,
    getFavorite: RecuperaCid,
    setData: PegaData,
    removeFavorita: Remove,
    useData: UsaDados
  }
}]);
