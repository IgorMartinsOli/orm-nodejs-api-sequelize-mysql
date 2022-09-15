const db = require('../models/index')
const Sequelize = require('sequelize')

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try{
            const pessoasAtivas = await db.Pessoas.findAll()
            return res.status(200).json(pessoasAtivas);
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }
    
    static async pegaTodasPessoas(req, res) {
        try{
            const todasPessoas = await db.Pessoas.scope('todos').findAll()
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

    static async restauraPessoa (req, res) {
        const id = req.params.id
        
        try {
            await db.Pessoas.restore({where: {id: Number(id)}});
            res.status(200).json({success: true});
        }catch (err){
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
        const {matriculaId} = req.params;
        try {
            await db.Matriculas.destroy({where: {id: Number(matriculaId)}});
            return res.status(200).json({success: true});
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }

    static async pegaMatriculas(req, res) {
        const {estudanteId} = req.params;
        try {
            const pessoa = await db.Pessoas.findOne({where: {id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const {turmaId} = req.params;
        try {
            const todasAsMatriculas = db.Matriculas.findAndCountAll({
                where: {
                turma_id: Number(turmaId),
                status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
        })
            return res.status(200).json(todasAsMatriculas)
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await db.Matriculas.findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })

            res.status(200).json(turmasLotadas.count)
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }

    static async cancelaPessoa(req, res) {
        const estudanteId = req.params;
        try {
            await db.Pessoas
            .update({ativo: false}, {where: {id: Number(estudanteId)}})
            await db.Matriculas
            .update({status: 'cancelado'}, {where: {estudante_id: Number(estudanteId)}})
            res.status(200).json({success: true})
        }catch (err) {
            return res.status(500).json({error: err.message});
        }
    }
}

module.exports = PessoaController;