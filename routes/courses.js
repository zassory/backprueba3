/*
    Rutas de Cursos / Course
    Base -> host + /api/courses
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    createCourseController,
    desactivatedCourseController,
    getCourseController,
    updateCourseController,
    } = require('../controllers/course/course');

const router = Router();

router.post('/' , createCourseController );
router.put('/:id' , updateCourseController );
router.delete('/:id' , desactivatedCourseController );
router.get('/', getCourseController );

module.exports = router;