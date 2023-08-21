const { banco, contas, saques, depositos, transferencias } = require('../bancodedados');
let numero = 1;

function criarConta(req, res) {
    const novaConta = { numero, ...req.body };

    const { nome, cpf, data_nascimento, telefone, email, senha } = novaConta;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({ mensagem: "Não foi possível criar uma nova conta, pois algum campo não foi preenchido." });
    } else if (contas.find((conta) => conta.cpf === cpf)) {
        return res.status(409).json({ mensagem: "Já existe uma conta com esse CPF." })
    } else if (contas.find((conta) => conta.email === email)) {
        return res.status(409).json({ mensagem: "Já existe uma conta com esse email." })
    } else {
        contas.push(novaConta);
        res.status(201);
        numero++;
    }
}

module.exports = {
    criarConta
}