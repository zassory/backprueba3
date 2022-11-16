const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario_model');

//servicio
const { createUserService } = require('../services/users/createUserService');
const { updateUserService } = require('../services/users/updateUserService');
const { getUserService } = require('../services/users/getUserService');

const createUserController = async( req, res = response ) => {
    
    const { statusCode,ok,uid } = await createUserService(req.body);

    if( statusCode ===  400){
        return res.status(400).json({
            ok,
            msg
        })
    }

    res.json({
        ok,
        uid
    });

}

const updateUserController = async( req , res=response ) => {

    const { statusCode , ok , uid , user } = await updateUserService(req.params.email,req.body);

    if( statusCode === 400 ){
        return res.status(400).json({
            ok,
            msg
        })
    }

    res.status(200).json({
        ok,
        uid,
        user
    });

}

const getUserController = async(req,res=response)  =>{
    const { statusCode , ok , activeUsers } = getUserService();

    if( statusCode === 400 ){
        return res.status(400).json({
            ok,
            msg
        })
    }

    res.status(200).json({
        statusCode,
        ok,
        activeUsers
    });
}

module.exports = {
    createUserController,
    updateUserController
}