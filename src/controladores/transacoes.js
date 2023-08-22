const { banco, contas, saques, depositos, transferencias } = require('../bancodedados');

function depositar(req, res) {
    const { numero_conta } = req.body;
    const posicaoNumero_conta = (contas.findIndex((conta) => conta.numero === Number(numero_conta)));
    contas[posicaoNumero_conta].saldo += req.body.valor;

    let dataNoDeposito = { data: new Date().toLocaleString(), ...req.body }
    depositos.push(dataNoDeposito);
    res.status(201).json({ Mensagem: "Valor depositado." });
}

function sacar(req, res) {
    const { numero_conta } = req.body;
    const posicaoNumero_conta = (contas.findIndex((conta) => conta.numero === Number(numero_conta)));
    contas[posicaoNumero_conta].saldo -= req.body.valor;

    delete req.body.senha;
    let dataNoSaque = { data: new Date().toLocaleString(), ...req.body }
    saques.push(dataNoSaque);
    res.status(201).json({ Mensagem: "Saque feito." });
}

function transferir(req, res) {
    const { numero_conta_origem, numero_conta_destino } = req.body;
    const posicaoContaOrigem = (contas.findIndex((conta) => conta.numero === Number(numero_conta_origem)));
    const posicaoContaDestino = (contas.findIndex((conta) => conta.numero === Number(numero_conta_destino)));
    contas[posicaoContaOrigem].saldo -= req.body.valor;
    contas[posicaoContaDestino].saldo += req.body.valor;

    delete req.body.senha;
    let dataNaTransferencia = { data: new Date().toLocaleString(), ...req.body }
    transferencias.push(dataNaTransferencia);
    console.log(transferencias);
    res.status(201).json({ Mensagem: "Transferência feita." });
}



module.exports = {
    depositar,
    sacar,
    transferir
}