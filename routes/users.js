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

router.post('/new', function(req,res) {
    	//res.send('prueba new');

    	var usuario={};
    	usuario.usuario=req.params.usuario;
    	usuario.nombre=req.params.nombre;
    	ususario.password=req.params.password;

    })

module.exports = router;
