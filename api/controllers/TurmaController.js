const db = require('../models/index')

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {
        try {
            const todasAsTurmas = await db.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController