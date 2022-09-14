const {Router} = require('express');
const PessoaController = require('../controllers/PessoasController');

const router = Router();

router.get('/pessoas', PessoaController.searchAll);
router.get('/pessoas/:id', PessoaController.findByPk);
router.post('/pessoas/new', PessoaController.novaPessoa);
router.put('/pessoas/edit/:id', PessoaController.editPessoa);
router.delete('/pessoas/delete/:id', PessoaController.deletePessoa);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegarUmaMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.novaMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deleteMatricula);

module.exports = router;