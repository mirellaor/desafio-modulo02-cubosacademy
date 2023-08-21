const express = require('express');
const contabancaria = require('./controladores/contabancaria');
const intermediadores = require('./intermediadores');

const rotas = express();

rotas.post('/contabancaria', intermediadores.verificacaoNovaConta, contabancaria.criarConta);
rotas.get('/contabancaria', intermediadores.verificaListagemContas, contabancaria.listarContas);

module.exports = rotas;