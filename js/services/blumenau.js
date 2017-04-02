'use strict';
//dados ficticios para a cidade de blumenau
app.factory('blumenau', function() {
  return {
      "nome": "Blumenau",
      "cidade":"Blumenau -  SC",
      "sigla": "SC",
      "agora":
        {
          "data_hora":"02/04/2017 - 00:38",
          "descricao":"Muito Nublado (noite)",
          "temperatura":"19",
          "umidade":"96%",
          "visibilidade":"7,24 km",
          "vento_velocidade":"6,44 km/h",
          "vento_direcao":"NW",
          "pressao":"32.712,53 mBar",
          "pressao_status":"estável",
          "nascer_do_sol":"6:8 am",
          "por_do_sol":"6:0 pm"
        },
        "previsoes":
          [
            {
              "data":"Segunda - 03/04/2017",
              "descricao":"Trovoadas",
              "temperatura_max":"25",
              "temperatura_min":"16"
              
            },
            {
              "data":"Terça - 04/04/2017",
              "descricao":"Ensolarado",
              "temperatura_max":"30",
              "temperatura_min":"18"
              
            },
            {
              "data":"Quarta - 05/04/2017",
              "descricao":"Ensolarado",
              "temperatura_max":"27",
              "temperatura_min":"17"
              
            },
            {
              "data":"Quinta - 06/04/2017",
              "descricao":"Ensolarado",
              "temperatura_max":"27",
              "temperatura_min":"17"
             
            },
            {
              "data":"Sexta - 07/04/2017",
              "descricao":"Trovoadas Isoladas",
              "temperatura_max":"27",
              "temperatura_min":"21"
              
            },
            {
              "data":"Sábado - 08/04/2017",
              "descricao":"Trovoadas Isoladas",
              "temperatura_max":"27",
              "temperatura_min":"21",
              
            },
            {
              "data":"Domingo - 08/04/2017",
              "descricao":"Trovoadas",
              "temperatura_max":"27",
              "temperatura_min":"21"
            }]
      }
});
