const express = require('express');
const contabancaria = require('./controladores/contabancaria');
const transacoes = require('./controladores/transacoes');
const intermediadores = require('./intermediadores');


const rotas = express();

rotas.post('/contas', intermediadores.verificaPreenchimentoCampos, intermediadores.verificaDadosRepetidos, contabancaria.criarConta);
rotas.get('/contas', intermediadores.verificaListagemContas, contabancaria.listarContas);
rotas.put('/contas/:numeroConta/usuario', intermediadores.verificaPreenchimentoCampos, intermediadores.verificaNumeroConta, intermediadores.verificaDadosRepetidosAtualizacao, contabancaria.atualizarConta);
rotas.delete('/contas/:numeroConta', intermediadores.verificaNumeroConta, intermediadores.verificaSaldoZero, contabancaria.excluirConta);
rotas.post('/transacoes/depositar', intermediadores.verificaNumeroeDeposito, intermediadores.verificaExistenciaConta, intermediadores.verificaValorDeposito, transacoes.depositar);
rotas.post('/transacoes/sacar', intermediadores.verificaNumeroValoreSenha, intermediadores.verificaExistenciaConta, intermediadores.verificaSenhaValida, intermediadores.verificaSaldoSaque, transacoes.sacar);
rotas.post('/transacoes/transferir', intermediadores.verificacaoTransferencia, intermediadores.verificaContasOrigemDestino, intermediadores.verificaSenhaOrigem, intermediadores.verificaSaldoOrigem, transacoes.transferir);


module.exports = rotas;