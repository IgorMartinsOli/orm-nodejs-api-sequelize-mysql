const {Router} = require('express');
const PessoaController = require('../controllers/PessoasController');

const router = Router();

router.get('/pessoas', PessoaController.searchAll);
router.get('/pessoas/:id', PessoaController.findByPk);

module.exports = router;