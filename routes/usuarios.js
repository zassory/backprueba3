const express = require('express');

const Usuario = require('../models/usuario_model');
const ruta = express.Router();
const Joi = require('joi');

const { response } = express;

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

ruta.get('/',(req,res = response) => {

    let resultado = listarUsuariosActivos();
    resultado.then( users => {
        res.json(users)
    }).catch( err => {
        res.status(400).json({            
            error:err
        })
    });    
}
);
        

ruta.post('/', (req,res = response) => {
    let body = req.body;

    console.log('Voy a crear un usuario');

    const { error, value } = schema.validate({nombre:body.nombre,email:body.email});
    if(!error){
        let resultado = crearUsuario(body);

        resultado.then( user => {
            res.json({            
                valor: user
            })
        }).catch( err => {
            res.status(400).json({
                error:err
            })
        });
    }else{
        res.status(400).json({
            error
        })
    }

    
});

ruta.put('/:email', (req,res=response) => {

    const { error, value } = schema.validate({nombre:req.body.nombre});

    if(!error){
        let resultado = actualizarUsuario( req.params.email , req.body );    
        resultado.then( valor => {
            res.json({
                valor
            })
        }).catch( err => {
            res.status(400).json({
                err
            })
        });
    }else{
        res.status(400).json({
            error
        });
    }

    
});

ruta.delete('/:email', (req,res = response) => {
    let resultado = desactivarUsuario(req.params.email);
    resultado.then( valor => {
        res.json({
            valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});

const listarUsuariosActivos = async() => {
    let usuarioActivo =  await Usuario.find({"estado":true});
    return usuarioActivo;
}
//Una funcion asyncrona nos devuelve una promesa
const crearUsuario = async( body ) => {
    let usuario = new Usuario({
        email   : body.email,
        nombre  : body.nombre,
        password: body.password
    });
    return await usuario.save();
}

const actualizarUsuario = async(email,body) => {
    let usuario = await Usuario.findOneAndUpdate({"email":email} , {
        $set: {
            nombre  : body.nombre,
            password: body.password
        }
    },  {new:true});
    console.log(usuario);
    return usuario;
}

const desactivarUsuario = async(email) => {
    let usuario = await Usuario.findOneAndUpdate( {"email":email}, {
        $set: {
            estado: false
        }
    }, { new: true });
    return usuario;
}

module.exports = ruta;