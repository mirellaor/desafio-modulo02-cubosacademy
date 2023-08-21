const express = require('express');
const contabancaria = require('./controladores/contabancaria');
const intermediadores = require('./intermediadores');

const rotas = express();

rotas.post('/contas', intermediadores.verificaPreenchimentoCampos, intermediadores.verificaDadosRepetidos, contabancaria.criarConta);
rotas.get('/contas', intermediadores.verificaListagemContas, contabancaria.listarContas);
rotas.put('/contas/:numeroConta/usuario', intermediadores.verificaPreenchimentoCampos, intermediadores.verificaNumeroConta, intermediadores.verificaDadosRepetidosAtualizacao, contabancaria.atualizarConta);

module.exports = rotas;