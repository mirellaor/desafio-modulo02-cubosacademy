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
    if (!numeroExistente) {
        res.status(404).json({ mensagem: "Não existe uma conta com esse número." });
    } else {
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

function verificaNumeroeDeposito(req, res, next) {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || !valor) {
        res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    } else {
        next();
    }
}

function verificaValorDeposito(req, res, next) {
    if (req.body.valor <= 0) {
        res.status(400).json({ mensagem: "O valor para deposito deve ser maior que zero" });
    } else {
        next();
    }
}

function verificaNumeroParaDepositar(req, res, next) {
    const { numero_conta } = req.body;
    const numeroExistente = contas.find((item) => item.numero === Number(numero_conta));
    if (!numeroExistente) {
        res.status(404).json({ mensagem: "Não existe uma conta com esse número." });
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
    verificaSaldoZero,
    verificaNumeroeDeposito,
    verificaValorDeposito,
    verificaNumeroParaDepositar
}