const express = require('express');
const contabancaria = require('./controladores/contabancaria');
const { verificacaoNovaConta } = require('./intermediadores');

const rotas = express();

rotas.post('/contabancaria', verificacaoNovaConta, contabancaria.criarConta);

module.exports = rotas;