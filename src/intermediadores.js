const { banco, contas, saques, depositos, transferencias } = require('./bancodedados');

function verificaPreenchimentoCampos(req, res, next) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({ mensagem: "Não foi possível criar uma nova conta, pois algum campo não foi preenchido." });
    } else {
        next();
    }
}

function verificaDadosRepetidos(req, res, next) {
    const { cpf, email } = req.body;
    if ((contas.find((conta) => conta.usuario.cpf === cpf))) {
        return res.status(409).json({ mensagem: "Já existe uma conta com esse CPF." });
    } else if (contas.find((conta) => conta.usuario.email === email)) {
        return res.status(409).json({ mensagem: "Já existe uma conta com esse email." });
    } else {
        next();
    }
}

function verificaListagemContas(req, res, next) {
    const { senha_banco } = req.query;
    if (!(banco.senha === senha_banco)) {
        res.status(403).json({ mensagem: "A senha do banco informada é inválida!" });
    } else {
        next();
    }
}

function verificaNumeroConta(req, res, next) {
    const { numeroConta } = req.params;
    const numeroExistente = contas.find((item) => item.numero === Number(numeroConta));
    if (numeroExistente) {
        next();
    }
}

function verificaDadosRepetidosAtualizacao(req, res, next) {
    const { cpf, email } = req.body;
    const cpfRepetido = (contas.findIndex((conta) => conta.usuario.cpf === cpf));
    const emailRepetido = (contas.findIndex((conta) => conta.usuario.email === email));
    if ((cpfRepetido != (Number(req.params.numeroConta) - 1)) && (cpfRepetido != -1)) {
        return res.status(409).json({ mensagem: "Já existe uma conta com esse CPF." });
    } else if ((emailRepetido != (Number(req.params.numeroConta) - 1)) && (emailRepetido != -1)) {
        return res.status(409).json({ mensagem: "Já existe uma conta com esse email." });
    } else {
        next();
    }
}

function verificaSaldoZero(req, res, next) {
    const { numeroConta } = req.params;
    const posicaoNumeroConta = (contas.findIndex((conta) => conta.numero === Number(numeroConta)));
    if (contas[posicaoNumeroConta].saldo != 0) {
        res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    } else {
        next();
    }
}


module.exports = {
    verificaPreenchimentoCampos,
    verificaListagemContas,
    verificaNumeroConta,
    verificaDadosRepetidos,
    verificaDadosRepetidosAtualizacao,
    verificaSaldoZero
}