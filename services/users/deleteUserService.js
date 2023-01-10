const Usuario = require('../../models/usuario_model');

const deleteUserService = async(email) => {
     
     try{
         let user = await Usuario.findOneAndUpdate( {"email":email}, {
         $set: {
             estado: false
         }
         }, { new: true }).select({email:1,nombre:1});

         console.log(user);

         return {
            statusCode:200,
            ok:true,
            email:user.email,
            nombre:user.nombre
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
    deleteUserService
}