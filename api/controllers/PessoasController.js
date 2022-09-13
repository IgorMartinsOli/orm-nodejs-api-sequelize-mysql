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
    static async editPessoa(req, res) {
        const novasInfos = req.body;
        const id = req.params.id
        try {
            await db.Pessoas.update(novasInfos, {where: {id: Number(id)}})
            const pessoaAtualizada = await db.Pessoas.findByPk(id);
            return res.status(200).json(pessoaAtualizada)
        }catch(err) {
            return res.status(500).json({error: err.message});
        }
    }
    static async deletePessoa (req, res) {
        const id = req.params.id;
        try {
            await db.Pessoas.destroy(id);
            return res.status(200).json({success: true});
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }
}

module.exports = PessoaController;