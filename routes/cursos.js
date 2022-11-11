const express = require('express');
const { response } = express;
const ruta = express.Router();

ruta.get('/', (req,res) => {
    res.status(200).json({
        ok:200,
        msg:'Listo el GET de cursos'
    });
})

module.exports = ruta;