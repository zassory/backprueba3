/*
    Rutas de Usuarios / Auth
    Base -> host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
    createUserController,
    getUserController,
    getUsersController,
    updateUserController,
    } = require('../controllers/auth/auth');
//const { createUser , updateUser , deleteUser , getUser , findUser } = require('../controllers/auth');

const router = Router();

router.post('/', createUserController);
router.put('/:email' , updateUserController );
router.get('/', getUsersController );
router.get('/', getUserController);

module.exports = router;

