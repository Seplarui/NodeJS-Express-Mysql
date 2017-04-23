var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
//***CONEXIÓN A LA BASE DE DATOS****//


var dbconfig = require('./../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

/*****LISTADO DE USUARIOS****/

router.get('/', function (req, res) {
    connection.query("select * from usuario", function (err, results) {
        if (err) throw err;
        //console.log(req.params);
        console.log(results);
        res.status(200).send(results);
        //res.send(200, results);
        //return next();
    })
    //res.send('Aqui va el listado de usuarios');
   
});

/*******AÑADIR NUEVO USUARIO******/

router.post('/new', function (req, res) {
    //res.send('prueba new');
    var cifrado = bcrypt.hashSync(req.body.password, null, null);

    var usuario = {};
    usuario.usuario = req.body.usuario;
    usuario.nombre = req.body.nombre;
    usuario.password = cifrado;
    var nuevo_usuario = { usuario: usuario.usuario, password: usuario.password, nombre: usuario.nombre };
    //var nuevo_usuario = { usuario: '\'\'' + usuario.usuario + '\'', password: '\'\'' + cifrado + '\'', nombre: '\'\'' + usuario.nombre + '\'' }
    connection.query('insert into usuario set ?', nuevo_usuario, function (err, success) {
        if (err) throw err;
        console.log('Datos grabados', success.insertId);
        console.log("Cuerpo:"+req.body);
        console.log("Paramétros:" + req.params);
        console.log(cifrado);

    })


    });

module.exports = router;
