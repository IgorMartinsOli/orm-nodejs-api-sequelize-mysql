const {Router} = require('express');
const PessoaController = require('../controllers/PessoasController');

const router = Router();

router.get('/pessoas', PessoaController.searchAll);
router.get('/pessoas/:id', PessoaController.findByPk);
router.post('/pessoas/new', PessoaController.novaPessoa);

module.exports = router;