const Services = require('./Services')
const database = require('../models')

class PessoaService extends Service {
    constructor(){
        super('Pessoas');
        this.matriculas = new Services('Matriculas')
    }

    pegaRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll({where: {...where}})
    }

    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo].scope('todos').findAll({where: {...where}})
    }

    async cancelaPessoasEMatriculas(estudanteId){
        return database.sequelize.transaction(async transaction => {
            await super.atualizaRegistros({ativo: false}, estudanteId, {transaction: transaction})
            await this.matriculas.atualizaRegistros({status: 'cancelado'}, {estudanteId: estudanteId}, {transaction: transaction})
        })
    }
}

module.exports = PessoaService;