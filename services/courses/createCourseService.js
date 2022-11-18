const Curso = require('../../models/curso_model');

const createCourseService = async( body ) => {

    let courseCreated = new Curso({
        titulo: body.titulo,
        descripcion: body.desc
    });    
    try{
        
        if(!courseCreated){
            return {
                statusCode:400,
                ok:false,
                msg:'no hay un curso ingresado'
            }
        }

        await courseCreated.save();

        return {
            statusCode:200,
            ok:true,
            courseCreated
        }

    }catch(err){
        return {
            statusCode:500,
            ok:false,
            msg:'Hable con el administrador'
        };
    }

}

module.exports = {
    createCourseService
}