


var fs = require('fs');

var a = 'a'.charCodeAt();
var z = 'z'.charCodeAt();

fs.readFile('jam2.txt', {encoding: 'UTF-8'}, function(err, data) {
	var matches = (data.match(/[a-z][A-Z]{3}[a-z][A-Z]{3}[a-z]/g));
	var line = '';
	for (var ii = 0; ii < matches.length; ii++) {
		line += matches[ii][4];
	};
	console.log(line);
});





/*
fs.readFile('jam.txt', {encoding: 'UTF-8'}, function(err, data) {
	for (var ii = 0; ii < data.length; ++ii) {
		if(data[ii].charCodeAt() <= z && data[ii].charCodeAt() >= a) {
			//console.log(data[ii])
		}
	}
});*/