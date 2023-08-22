const { banco, contas, saques, depositos, transferencias } = require('../bancodedados');

function depositar(req, res) {
    const { numero_conta } = req.body;
    const posicaoNumero_conta = (contas.findIndex((conta) => conta.numero === Number(numero_conta)));
    contas[posicaoNumero_conta].saldo += req.body.valor;
    res.status(201);
}




module.exports = {
    depositar
}