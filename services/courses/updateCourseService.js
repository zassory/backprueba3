const Curso = require('../../models/curso_model');
const Joi = require('joi');

const updateCourseService = async( id , body ) => {

    try{

        if(!id){
            return {
                statusCode:400,
                ok:false,
                msg:'Mail es requerido'
            }
        }

        if(!body){
            return {
                statusCode:400,
                ok:false,
                msg:'Todos los campos son obligatorios'
            };
        }

        let course = await Curso.findByIdAndUpdate({"_id":id}, {
            $set:{
                titulo: body.titulo,
                descripcion: body.desc
            }
        },{ new:true });

        return {
            statusCode: 200,
            ok:true,
            id:course._id,
            course
        }

    }catch(err) {
        return {
            statusCode:500,
            ok:false,
            msg:'Por favor hable con el administrador'
        }
    }

}

module.exports = {
    updateCourseService
}