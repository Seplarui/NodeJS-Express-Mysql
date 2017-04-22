var express = require('express');
var router = express.Router();
var mysql=require('mysql')
//***CONEXIÓN A LA BASE DE DATOS****//


var dbconfig = require('./../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);
/* GET users listing. */
/*router.get('/', function(req, res) {


  res.send('respond with a resource');
});*/

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

router.post('/new', function (req, res) {
    //res.send('prueba new');

    var usuario = {};
    usuario.usuario = req.params.usuario;
    usuario.nombre = req.params.nombre;
    usuario.password = req.params.password;

    /*connection.query('insert into usuario(usuario, password,nombre) values (\'' + usuario.usuario + '\',\'' + usuario.password + '\',\'' + usuario.nombre + '\',\')', function (err, success) {
        if (err) throw err;
        res.send(200, success.Id);
    })*/

   /* connection.query('insert into usuario(usuario,password,nombre)' + 'values(' + usuario.usuario + ',' + usuario.password + ',' + usuario.nombre + ')', function (err, sucess) {
        if (err) throw err;
        res.send(200, succes.id);
    })*/
    /**
     * FUNCIONA
     */
    /*var nuevo_usuario = { usuario: 'usuario3', password: 'password3', nombre: 'nombre3' };
    connection.query('insert into usuario set ?', nuevo_usuario, function (err, res) {
        if (err) throw err;
        console.log('Datos Grabados', res.id);
    });*/

    var nuevo_usuario = { usuario: '\'\'' + usuario.usuario + '\'', password: '\'\'' + usuario.password + '\'', nombre: '\'\'' + usuario.nombre + '\'' }
    connection.query('insert into usuario set ?', nuevo_usuario, function (err, success) {
        if (err) throw err;
        console.log('Datos grabados', success.insertId);
        console.log(req.body);
        //res.send(200, success.insertId);
        //res.status(200).send();
        res.status(200).send(req.params);
        console.log("Este es el nuevo usuario introducido: " + nuevo_usuario);

       // res.status(200).send('Usuario añadido a la BBDD de manera correcta: ' + res.insertId);

    })


    });

module.exports = router;
