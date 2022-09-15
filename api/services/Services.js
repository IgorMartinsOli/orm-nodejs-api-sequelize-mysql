const database = require('../models')

class Services {
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo;
    }

    async pegaTodosOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistros(id) {

    }

    async crisRegistros(dado) {
        
    }

    async atualizaRegistros(dadosAtualizados, id, transaction = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, {where: {id: id}}, transaction)
    }

    async atualizaRegistros(dadosAtualizados, where,  id, transaction = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, {where: {...where}}, transaction)
    }

    async apagaRegistros(id) {

    }
}

module.exports = Services;