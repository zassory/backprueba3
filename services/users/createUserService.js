const Usuario = require('../../models/usuario_model');

const createUserService = async( body ) => {

    let user = new Usuario({
        email    : body.email,
        nombre   : body.nombre,
        password :body.password
    });
    try{        
        await user.save();

        return {
            statusCode:200,
            ok:true,
            uid:user.id            
        }

    }catch(err){
        return{
            statusCode:400,
            ok:false,
            msg:'Por favor hable con el administrador'
        }
    }

}

module.exports = {
    createUserService
}