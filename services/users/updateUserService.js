const express = require('express');
const Usuario = require('../../models/usuario_model');
const { response } = require('express');
const Joi = require('joi');


const updateUserService = async( email , body ) => {

    try{
        let user = await Usuario.findOneAndUpdate({"email":email}, {
            $set:{
                nombre   : body.nombre,
                password : body.password
            }
        }, {new:true});

        return {
            statusCode:200,
            ok:true,
            uid:user.ud,
            user
        }

    }catch(err){
        return {
            statusCode:400,
            ok:false,
            msg:'Por favor hable con el administrador'
        }
    }

}

module.exports = {
    updateUserService
}