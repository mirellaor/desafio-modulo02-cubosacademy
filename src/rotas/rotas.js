const express = require('express');
const contabancaria = require('../controladores/contabancaria');
const transacoes = require('../controladores/transacoes');
const verificacoes = require('../intermediarios/verificacoes');


const rotas = express();

rotas.post('/contas', verificacoes.verificaPreenchimentoCampos, verificacoes.verificaDadosRepetidos, contabancaria.criarConta);
rotas.get('/contas', verificacoes.verificaListagemContas, contabancaria.listarContas);
rotas.put('/contas/:numeroConta/usuario', verificacoes.verificaPreenchimentoCampos, verificacoes.verificaNumeroConta, verificacoes.verificaDadosRepetidosAtualizacao, contabancaria.atualizarConta);
rotas.delete('/contas/:numeroConta', verificacoes.verificaNumeroConta, verificacoes.verificaSaldoZero, contabancaria.excluirConta);
rotas.post('/transacoes/depositar', verificacoes.verificaNumeroeDeposito, verificacoes.verificaExistenciaConta, verificacoes.verificaValorDeposito, transacoes.depositar);
rotas.post('/transacoes/sacar', verificacoes.verificaNumeroValoreSenha, verificacoes.verificaExistenciaConta, verificacoes.verificaSenhaValida, verificacoes.verificaSaldoSaque, transacoes.sacar);
rotas.post('/transacoes/transferir', verificacoes.verificacaoTransferencia, verificacoes.verificaContasOrigemDestino, verificacoes.verificaSenhaOrigem, verificacoes.verificaSaldoOrigem, transacoes.transferir);
rotas.get('/contas/saldo', verificacoes.verificaContaSenhaQuery, verificacoes.verificaContaExisteQuery, verificacoes.verificaSenhaQuery, transacoes.consultarSaldo);
rotas.get('/contas/extrato', verificacoes.verificaContaSenhaQuery, verificacoes.verificaContaExisteQuery, verificacoes.verificaSenhaQuery, transacoes.emitirExtrato);

module.exports = rotas;