const express = require('express');
const { response } = express;
const Usuario = require('../models/usuario_model');
const ruta = express.Router();

ruta.get('/',(req,res = response) => {

    let resultado = listarUsuarios();
    resultado.then( users => {
        res.status(200).json({
            ok:true,
            users
        })
    }).catch( err => {
        res.status(400).json({
            ok:false,
            error:err
        })
    });    
}
);
        

ruta.post('/', (req,res = response) => {
    let body = req.body;
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
});

ruta.put('/:email', (req,res=response) => {
    let resultado = actualizarUsuario( req.params.email , req.body );    
     resultado.then( valor => {
          res.json({
              valor:valor
          })
      }).catch( err => {
          res.status(400).json({
              error:err
          })
      });
});

ruta.delete('/:email', (req,res = response) => {
    let resultado = desactivarUsuario(req.params.email);
    resultado.then( valor => {
        res.json({
            usuario: valor
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
});

const listarUsuarios = async() => {
    return await Usuario.find();    
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
    let usuario = await Usuario.findOneAndUpdate(email , {
        $set: {
            nombre  : body.nombre,
            password: body.password
        }
    },  {new:true});
    console.log(usuario);
    return usuario;
}

const desactivarUsuario = async(email) => {
    let usuario = await Usuario.findOneAndUpdate( email, {
        $set: {
            estado: false
        }
    }, { new: true });
    return usuario;
}

module.exports = ruta;