var fs = require('fs');

var Buffer = require('buffer').Buffer;


var readStream = fs.createReadStream('red.jpg');

readStream.on('readable', function() {
	var chunk;
	while (null !== (chunk = readStream.read())) {
		//console.log('chunk:', chunk);
		processBuffer(chunk);
     	//console.log(chunk[i].toString(16));
	}
});


var processBuffer = function(buff) {
	console.log('lenght:', buff.length);

	var offset;
	var amount;
	console.log('start      :', buff.toString('hex', 0, 2));  

	console.log('code       :', buff.toString('hex' , 2 , 4 ));  
	console.log('longueur   :', buff.toString('hex' , 4 , 6 ));  
	console.log('identifiant:', buff.toString('utf8', 6 , 12));  
	console.log('version    :', buff.toString('hex' , 12, 14));  
	console.log('densité    :', buff.toString('hex' , 14, 15));  
	console.log('densité X  :', buff.toString('hex' , 15, 17));  
	console.log('densité Y  :', buff.toString('hex' , 17, 19));  
	console.log('tw         :', parseInt(buff.toString('hex' , 19, 20), 16));  
	console.log('th         :', parseInt(buff.toString('hex' , 20, 21), 16));
	console.log('t data     :', buff.toString('hex' , 21, 21));  

	console.log('??????     :', buff.toString('hex' , 22, 60));  

	console.log(buff)
	for (var i = 0; i < buff.length; i++) {
		console.log('->:', buff.readUInt8(i).toString(16));
		//buff[i]
		//if(i > 5) break;;
	};




}
