
var sys = require ('sys'),
url = require('url'),
http = require('http'),
qs = require('querystring');
var net = require('net');

http.createServer(function (req, res) {

	if(req.method=='POST'){
		var body='';
		req.on('data', function (data){
			body +=data;
			Mi_cadena=data;
		});
		req.on('end',function(){
			var POST = qs.parse(body);
			/** console.log(POST); */
		});



		var client = new net.Socket();
		client.connect(1337, '192.168.1.101', function() {
			console.log('Connected');
			client.write(Mi_cadena);
		});

		client.on('data', function(data) {
			console.log('Received...: ' + data);
			client.destroy(); // kill client after server's response
		});

		client.on('close', function() {
			console.log('Connection closed');
		});



		res.end("yeah");
	}
	else if(req.method=='GET') {
		var url_parts = url.parse(req.url,true);
		console.log(url_parts.query);
	}
}).listen(8080, "192.168.1.100");




			
