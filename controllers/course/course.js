const { response } = require('express');

//Services
const { createCourseService } = require('../../services/courses/createCourseService');
const { updateCourseService } = require('../../services/courses/updateCourseService');
const { desactivatedCourseService } = require('../../services/courses/desactivatedCourseService');
const { getCourseService } = require('../../services/courses/getCourseService');

const createCourseController = async( req , res = response ) => {

    const { statusCode , ok , courseCreated } = await createCourseService( req.body );

    if( statusCode === 400 ){
        return res.status(400).json({
            ok,
            msg
        })
    }

    res.json({
        statusCode,
        ok,
        courseCreated
    });
}

const updateCourseController = async( req , res = response ) => {

    const { statusCode , ok , id , course } = await updateCourseService(req.params.id,req.body);

    if( statusCode === 400 ){
        return res.status(400).json({
            ok,
            msg
        });
    }

    res.status(200).json({
        ok,
        id,
        course
    });

}

const desactivatedCourseController = async(req, res = response) => {

    const { statusCode , ok , course } = await desactivatedCourseService(req.params.id);

    if(statusCode === 400){
        return res.status(400).json({
            ok,
            msg
        });
    }

    res.status(200).json({
        statusCode,
        ok,
        course
    });

}

const getCourseController = async(req,res=response) => {
    
    const { statusCode , ok , activeCourseById } = await getCourseService(req.body.id);

    if(statusCode === 400){
        return res.status(400).json({
            ok,
            msg
        });
    }

    res.status(200).json({
        statusCode,
        ok,
        activeCourseById
    });

}


module.exports = {
    createCourseController,
    desactivatedCourseController,
    getCourseController,
    updateCourseController
}
