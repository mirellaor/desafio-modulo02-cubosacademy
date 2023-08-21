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

module.exports = {
    criarConta,
    listarContas
}