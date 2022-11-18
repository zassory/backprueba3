const Curso = require('../../models/curso_model');
const Joi = require('joi');

const desactivatedCourseService = async(id) => {

    try{
        let course = await Curso.findByIdAndUpdate({"_id":id},{
            $set: {
                estado: false
            }
        },{ new:true });

        if(!course){
            return {
                statusCode:400,
                ok:false,
                msg:'No hay usuario con ese id'
            }
        }

        return {
            statusCode:200,
            ok:true,
            course
        }
        
    }catch(err){
        return {
            statusCode: 500,
            ok:false,
            msg:'Hable con el administrador'
        }
    }
    
}

module.exports = {
    desactivatedCourseService
}