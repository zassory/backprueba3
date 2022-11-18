const { response } = require('express');

//servicio
const { createUserService } = require('../../services/users/createUserService');
const { updateUserService } = require('../../services/users/updateUserService');
const { getUserService } = require('../../services/users/getUserService');
const { getUsersService } = require('../../services/users/getUsersService');

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

const getUserController = async(req,res=response) => {
    
    const { statusCode , ok , activeUsersById } = await getUserService(req.body.email);

    if( statusCode === 404 ){
        return res.status(404).json({
            ok,
            msg
        })
    }

    res.status(200).json({
        statusCode,
        ok,
        activeUsersById
    });

}

const getUsersController = async(req,res=response)  =>{
    const { statusCode , ok , activeUsers } = await getUsersService();    

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
    getUserController,
    getUsersController,
    updateUserController
}