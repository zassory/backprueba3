const express = require('express');
const mongoose = require('mongoose'); //orm

const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');

//Conectarnos a la BD
mongoose.connect('mongodb://localhost/demo')
    .then(()=> console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB',err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
//Rutas
//app.use('/api/usuarios' , require('./routes/auth'));
app.use('/api/usuarios', usuarios );
app.use('/api/cursos', cursos );
//Routes
app.use('/api/users', require('./routes/auth'));
app.use('/api/courses' , require('./routes/courses'));

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.clear();
    console.log('Api RESTFull ok y ejecutandose...');
})