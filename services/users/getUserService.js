const Usuario = require('../../models/usuario_model');


const getUserService = async( email ) => {

    try{
        let activeUsersById = await Usuario.find({"email":email});

        if(!activeUsersById){
            return {
                statusCode:400,
                ok:false,
                msg:'No hay usuario con ese email'
            }
        }
        return {
            statusCode:200,
            ok:true,
            activeUsersById
        }
    }catch(err){
        return {
            statusCode:500,
            ok:false,
            msg:'Hable con el administrador'
        }
    }

}

module.exports = {
    getUserService
}