const db = require('../models/index')

class PessoaController {
    static async searchAll(req, res) {
        try{
            const todasPessoas = await db.Pessoas.findAll()
            return res.status(200).json(todasPessoas);
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }
    static async findByPk(req, res) {
        const id = req.params.id

        try {
            const pessoa = await db.Pessoas.findByPk(id);
            return res.status(201).json(pessoa);
        }catch (err) {
            return res.status(500).json({error: err.message});
        }

    }
    static async novaPessoa (req, res){
        const infoPessoa = req.body;

        try {
            const newPessoa = await db.Pessoas.create(infoPessoa);
            return res.status(200).json(newPessoa);
        }catch(err) {
            return res.status(500).json({error: err.message});
        }
    }
}

module.exports = PessoaController;