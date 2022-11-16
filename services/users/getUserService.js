const express = require('express');
const Usuario = require('../../models/usuario_model');
const { response } = require('express');

const getUserService = async() => {

    try{
        let activeUsers = await Usuario.find({"estado":true});

        return {
            statusCode:200,
            ok:true,
            activeUsers
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
    getUserService
}