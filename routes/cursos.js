const express = require('express');
const Curso = require('../models/curso_model');
const { response } = express;
const ruta = express.Router();

ruta.get('/', (req,res) => {
    let resultado = listarCursosActivos();
    resultado.then( curso => {
        res.json({
            curso
        })
    }).catch( err => {
        res.status(400).json({
            err
        });
    });
});

ruta.post('/',(req,res=response) => {
    let resultado = crearCurso(req.body);

    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

ruta.delete('/:id', (req,res = response) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err);
    })
})

ruta.put('/:id', (req,res=response) => {
    console.log(req.params.id);
    console.log(req.body);
    let resultado = actualizarCurso( req.params.id , req.body );    
    resultado.then(curso => {
         res.json({
             curso
         })
     }).catch(err => {
         res.status(400).json({
             err
         })
     })
})

ruta.patch('/:id', (req,res = response) => {
    
     let resultado = activarCurso(req.params.id);
     resultado.then( curso => {
         res.json({
             curso
         })
     }).catch(err => {
         res.status(400).json({
             err
         })
     })
})

ruta.delete('/:id', (req,res=response) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then( curso => {
        res.json(curso)
    }).catch(err => {
        res.status(400).json(err);
    })
})



const crearCurso = async(body) => {
    let curso = new Curso({
        titulo : body.titulo,
        descripcion : body.desc
    });
    return await curso.save();
}

const actualizarCurso = async(id,body) => {
    let curso = await Curso.findByIdAndUpdate({"_id":id}, {
        $set : {
            titulo: body.titulo,
            descripcion: body.desc
        }
    },{new:true});
    return curso;
}

const desactivarCurso = async(id) => {
    let curso = await Curso.findByIdAndUpdate({"_id":id},{
        $set: {
            estado: false
        }
    },{new:true});
    return curso;
}

const activarCurso = async(id) => {
    let curso = await Curso.findByIdAndUpdate({"_id":id}, {
        $set : {
            estado: true
        }
    },{new:true});
    return curso;
}

const listarCursosActivos = async() => {
    let cursos = await Curso.find({"estado": true});
    return cursos;
}

module.exports = ruta;