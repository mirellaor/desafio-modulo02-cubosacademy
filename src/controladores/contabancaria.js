const { banco, contas, saques, depositos, transferencias } = require('../bancodedados');
let numero = 1;

function criarConta(req, res) {
    const novaConta = { numero, ...req.body };
    contas.push(novaConta);
    res.status(201);
    numero++;
}

module.exports = {
    criarConta
}