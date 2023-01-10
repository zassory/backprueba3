const Usuario = require('../../models/usuario_model');


const getUsersService = async() => {

    try{
        let activeUsers = await Usuario.find({"estado":true})
        .select({nombre:1,email:1});

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
    getUsersService
}