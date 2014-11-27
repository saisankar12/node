
/*
Added 
          self.emit('filecomment', fileComment); 
    in parse.js of the unzip lib 
*/
var unzip = require('unzip');
var fs = require('fs');


var files = []
var comment = '';

var pos = [];

var currentPos = 0;

var finalComment = '';

fs.createReadStream('data/channel.zip')
    .pipe(unzip.Parse())
    .on('entry', function(entry) {
        var fileName = entry.path;
        var type = entry.type; // 'Directory' or 'File'
        var size = entry.size;

        //console.log('->', entry.type, fileName);
        entry.pipe({
            on: function(data) {
                //if (fileName == '46145.txt') {
                    //console.log('on:', data.fileComment);
                //}
            },
            once: function(buffer) {
                //if (fileName == '46145.txt') {
                //    console.log('once:', buffer.toString());
                //}
            },
            emit: function() {
                //if (fileName == '46145.txt') {
                //    console.log('emit:', arguments.fileComment);
                //}
            },
            write: function(buffer) {
                //if (fileName == '46145.txt') {
                //console.log(buffer.toString());
                //}

                var str = buffer.toString();
                //console.log(buffer.toString(), entry);
                files.push({name:fileName, content: str, pos: ++currentPos});
            },
            end: function() {
                //if (fileName == '46145.txt') {
                //    console.log('end:', arguments);
                //}
            }
        });
        //entry.pipe(process.stdout);
        entry.autodrain();


    }).on('filecomment', function(buffer) {
    	comment += buffer.toString();
    	//console.log(buffer.toString());
    }).on('close', function(data) {

    	//console.log('comment count:', comment.length);
        //console.log('CLOSE:', data);
        //console.log('file count:', files.length);


        var getNext = function(next) {

            for (var ii = 0; ii < files.length; ii++) {
                if (files[ii].name == next + '.txt') {
                    var output = files[ii].content;
                    var match = output.match(/\d+/g);
                    var pos = files[ii].pos;

                    finalComment += comment[pos-1];

                    //console.log(output, 'match is', match);

                    if (!match) {
                        console.log('End reached:', files[ii]);
                        console.log('\n', finalComment);

                        var uniqueLetters = '';
                        for (var ii = 0; ii < finalComment.length; ii++) {
                        	if(uniqueLetters.indexOf(finalComment[ii]) == -1) {
                        		uniqueLetters += finalComment[ii];
                        	}
                        }
                        console.log('final word: ',uniqueLetters);


                        return;
                    } else if (match.length === 1) {
                        next = match[0];
                    } else if (match.length === 2) {
                        next = match[1];
                    } else {
                        console.log('unexpected output');
                        return;
                    }

                    getNext(next);
                    return;
                }
            };

        }
        getNext(90052);
    });
