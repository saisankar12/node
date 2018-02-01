var fs = require('fs');

var Buffer = require('buffer').Buffer;


var readStream = fs.createReadStream('red.png');

readStream.on('readable', function() {
	var chunk;
	while (null !== (chunk = readStream.read())) {
		//console.log('chunk:', chunk);
		processBuffer(chunk);
	}
});


var processBuffer = function(buff) {
	console.log('lenght:', buff.length);

	console.log('PNG        :', buff.toString('hex', 0, 8));  

	console.log('???        :', buff.toString('hex', 8, 12));  

	// End of header

    console.log('IHDR       :', buff.toString('hex' , 12 , 18 ));  


    console.log('W          :', buff.toString('hex' , 16 , 20 ));  
    console.log('H          :', buff.toString('hex' , 20 , 24 ));  


    console.log('bits              :', buff.toString('hex' , 24 , 25 ));
    console.log('colorType         :', buff.toString('hex' , 25 , 26 ));
    console.log('compressionMethod :', buff.toString('hex' , 26 , 27 ));
    console.log('filterMethod      :', buff.toString('hex' , 27 , 28 ));
    console.log('interlaceMethod   :', buff.toString('hex' , 28 , 29 ));

    console.log('section           :', buff.toString('hex' , 30 , 34 ));  

	//console.log('w          :', buff.readUInt32BE(18));  
	//console.log('w          :', buff.readUInt32BE(24));  



	for (var ii = 143; ii <= 200; ++ii) {
    //console.log('       :', ii, buff[ii]);
    console.log(buff.toString('hex' , ii , ii+64 ));  
		//console.log(String.fromCharCode(buff[ii]));
    	//console.log('       :', buff.toString('hex' , ii , ii+2 ));  
		//console.log(buff[ii]);
		//console.log(buff.toString('hex' , ii , ii+2 ));
	}

	

	//console.log(buff)
	for (var i = 0; i < buff.length; i++) {
		//console.log('->:', buff.readUInt8(i).toString(16));
		//buff[i]
		//if(i > 5) break;;
	};




}
