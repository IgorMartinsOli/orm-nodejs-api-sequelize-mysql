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
            await db.Pessoas.destroy({where: {id: Number(id)}});
            return res.status(200).json({success: true});
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }

    static async pegarUmaMatricula(req, res) {
        const {estudanteId, matriculaId} = req.params

        try {
            const matricula = await db.Matriculas.findByPk({where:{
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }});
            return res.status(201).json(matricula);
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }
    static async novaMatricula (req, res){
        const {estudanteId} = req.params;
        const infoMatricula = { ...req.body, estudante_id: Number(estudanteId)};

        try {
            const novaMatricula = await db.Matriculas.create(infoMatricula);
            return res.status(200).json(novaMatricula);
        }catch(err) {
            return res.status(500).json({error: err.message});
        }
    }

    static async atualizaMatricula(req, res) {
        const novasInfos = req.body;
        const {estudanteId, matriculaId} = req.params
        try {
            await db.Matriculas.update(novasInfos, {where: {
                id: Number(matriculaId),
                estudante_id: Number(estudanteId)
            }})
            const matriculaAtualizada = await db.Pessoas.findByPk(matriculaId);
            return res.status(200).json(matriculaAtualizada)
        }catch(err) {
            return res.status(500).json({error: err.message});
        }
    }
    static async deleteMatricula (req, res) {
        const {estudanteId, matriculaId} = req.params;
        try {
            await db.Matriculas.destroy({where: {id: Number(matriculaId)}});
            return res.status(200).json({success: true});
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }
}

module.exports = PessoaController;