'use strict';
app.service('config', ['$http', 'favoritaCid', function($http, favoritaCid){
  var baseUri = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
// config API chave apiKey pode ser adquirida no site https://openweathermap.org/
  var WEATHER_API = {
    apiKey: '&APPID=5903da0248007c01ea5a20791dc05918',
    units: '&units=metric',
    mode: '&mode=json',
    days:'&cnt=10',
    lang: "&lang=pt"
  };

  this.consult = function(cidade, estado) {

    var finalUri = [
      baseUri, cidade.toLowerCase(), 'br',
      WEATHER_API.mode, WEATHER_API.units, WEATHER_API.days,
      WEATHER_API.lang, WEATHER_API.apiKey
    ].join('');
    return $http.get(finalUri, {cache: true});
  }
}]);
