/*
    Rutas de eventos 
    host + /api/events
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt');
const { getEventos, createEvento, updateEvento, removeEvento  } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');


const router = Router();
router.use( validarJWT );

router.get( '/', getEventos );

router.post( '/', 
[
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    validarCampos
],
createEvento );

router.put( '/:id', 
[
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    validarCampos
],
updateEvento );

router.delete( '/:id', removeEvento );



module.exports = router;