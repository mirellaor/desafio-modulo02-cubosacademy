const express = require('express');
const contabancaria = require('./controladores/contabancaria');

const rotas = express();

rotas.post('/contabancaria', contabancaria.criarConta);

module.exports = rotas;