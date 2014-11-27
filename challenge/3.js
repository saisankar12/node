var urllib = require('urllib');

var base = 'http://www.pythonchallenge.com/pc/def/linkedlist.php?nothing=';

var next = 12345
/*
next = 16044/2;
next = 46059;
next = 26910;
next = 94017;
next = 9862;
next = 68209;
next = 55294;
next = 16044;
next = 49754;
var next = 3875
*/
            

var getNext = function(next) {

    if(next == 16044) {
        console.log('dividing as expected')
        next = 16044/2;
    }
    console.log('going to:', next);
    urllib.request(base + next, function (err, data, res) {
    if (err) {
        console.log('retrying', next);
        getNext(next);
        return;
    }
    var output = data.toString();

    var match = output.match(/\d+/g);
    console.log(output, 'match is', match);

    if(!match) {
        console.log('End reached:', output);
        return;
    }
    else if(match.length === 1) {
        next = match[0];
    }
    else if(match.length === 2) {
        next = match[1];
    } else {
        console.log('unexpected output');
        return;
    }

    //console.log(res.statusCode);
    //console.log(res.headers);
    // data is Buffer instance


    getNext(next);
    });
};


getNext(next);


