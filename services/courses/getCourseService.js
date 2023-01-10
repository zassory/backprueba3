const Curso = require('../../models/curso_model');

const getCourseService = async( id ) => {
    
    try{

        let activeCourseById = await Curso.find({"_id":id});

        console.log("El curso es: ",activeCourseById);

        if(!activeCourseById){
            return {
                statusCode:500,
                ok:false,
                msg:'No hay cursos con ese id'   
            }
        }

        return {
            statusCode:200,
            ok:true,
            activeCourseById
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
    getCourseService
}