var net = require('net');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('MyBBDD.db');
var prueba = '';

/** function get_kw_actual(nombre){ */
function get_kw_actual(nombre,callback){ 
	stmt = db.prepare("SELECT kw_actual FROM usuarios WHERE usuario = ?");
		stmt.bind(nombre);
		stmt.get(function(error,row){
			if(error){
				throw err;
			}
			else{
				if(row){
					/** console.log(row); */
					/** console.log(row.kw_actual); */
					entero=row.kw_actual;
					callback(entero);
				}
				else{
					console.log("error");
				}
			}
			

		});
		
}



var server = net.createServer(function(socket) {
	console.log("Recibo peticion");

	socket.on('data', function (data) {
		get_kw_actual('Pepe',function(resultado){
			console.log('resultado es: ' + resultado);
			prueba = '' + resultado;
		
		})

		

	});

	socket.on('close', function () {
			console.log('Connection closed');
	});

	console.log('antes del write');
	socket.write(prueba);
	console.log('despues del write');

 	socket.pipe(socket); 
});

server.listen(1337, '192.168.1.101');