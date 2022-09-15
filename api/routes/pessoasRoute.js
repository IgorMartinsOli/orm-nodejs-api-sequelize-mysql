const {Router} = require('express');
const PessoaController = require('../controllers/PessoasController');

const router = Router();

router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
router.get('/pessoas', PessoaController.pegaTodasPessoas);
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas);
router.get('/pessoas/:id', PessoaController.findByPk);
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
router.post('/pessoas', PessoaController.novaPessoa);
router.put('/pessoas/edit/:id', PessoaController.editPessoa);
router.delete('/pessoas/:id', PessoaController.deletePessoa);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegarUmaMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.novaMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deleteMatricula);
router.post('/pessoas/:id/restaura',  PessoaController.restauraPessoa)
router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)
router.post('pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)

module.exports = router;