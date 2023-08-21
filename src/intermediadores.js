const { banco, contas, saques, depositos, transferencias } = require('./bancodedados');

function verificacaoNovaConta(req, res, next) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({ mensagem: "Não foi possível criar uma nova conta, pois algum campo não foi preenchido." });
    } else if (contas.find((conta) => conta.cpf === cpf)) {
        return res.status(409).json({ mensagem: "Já existe uma conta com esse CPF." })
    } else if (contas.find((conta) => conta.email === email)) {
        return res.status(409).json({ mensagem: "Já existe uma conta com esse email." })
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

module.exports = {
    verificacaoNovaConta,
    verificaListagemContas
}