var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname+"/public")); // Current directory is root





app.get('/', function(req, res){
	var links = "";
	links += "<a href=/watchmumble>Mumble</a><br/>"
	links += "<a href=/watchminecraft>Minecraft</a><br/>"
	res.send(links);
});

app.get('/watchmumble', function(req, res){

	fs.readFile("data/murmur.log", 'utf8', function (err,data) {
		if (err) {
	  		console.log(err);
	  		res.send(err);
	  		return;
		}
		var send = "";
		var array = data.toString().split("\n").slice(-500);

		var lines = 0;

    	for(var ii = array.length-1; ii > 0; --ii) {
    		if (array[ii].indexOf("thenti") != -1) {
    			send += "<p style='color:green'>"+array[ii]+"</p>"
    			++lines;
    		}
    		if (array[ii].indexOf("losed") != -1) {
    			send += "<p style='color:rgb(200,0,0)'>"+array[ii]+"</p>"
    			++lines;
    		}
    		if(lines > 15) break;
    	}
		res.send(send);
	});
});

app.get('/watchminecraft', function(req, res){

	fs.readFile("data/minecraft.log", 'utf8', function (err,data) {
		if (err) {
	  		console.log(err);
	  		res.send(err);
	  		return;
		}
		var send = "";
		var array = data.toString().split("\n").slice(-500);

		var lines = 0;

    	for(var ii = array.length-1; ii > 0; --ii) {
    		if (array[ii].indexOf("joined") != -1) {
    			send += "<p style='color:green'>"+array[ii]+"</p>"
    			++lines;
    		}
    		else if (array[ii].indexOf("left") != -1) {
    			send += "<p style='color:rgb(200,0,0)'>"+array[ii]+"</p>"
    			++lines;
    		}
    		else {
    			//send += "<p style='color:rgb(100,100,0)'>"+array[ii]+"</p>"
    		}
    		if(lines > 15) break;
    	}
		res.send(send);
	});
});



fs = require('fs');

var port = 8088;
console.log('Listening on port', port);




var io = require('socket.io').listen(app.listen(port));
 
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        io.sockets.emit("message_to_client",{ message: data["message"] });
    });
});




