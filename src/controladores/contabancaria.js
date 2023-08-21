const { banco, contas, saques, depositos, transferencias } = require('../bancodedados');
let numero = 1;
let saldo = 0;

function criarConta(req, res) {
    let usuario = req.body;
    const novaConta = { numero, saldo, usuario };
    contas.push(novaConta);

    res.status(201);
    numero++;
}

function listarContas(req, res) {
    res.status(201).json(contas);
}

function atualizarConta(req, res) {
    const { numeroConta } = req.params;
    contas[numeroConta - 1].usuario = req.body;
    res.status(201);
}

function excluirConta(req, res) {
    const { numeroConta } = req.params;
    const posicaoNumeroConta = (contas.findIndex((conta) => conta.numero === Number(numeroConta)));
    contas.splice(posicaoNumeroConta, 1);
    res.status(201);
}

module.exports = {
    criarConta,
    listarContas,
    atualizarConta,
    excluirConta
}