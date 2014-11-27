var fs = require('fs')

// Get file in folder recursivly and call callback with the filepath
var getFiles = function(dir, callback)
{
	fs.readdir(dir, function(err, files) {
		if(err) {
			return;
		}
		files.forEach(function(file) {
			var stats = 0;
			var filepath = dir + '/' + file;
			stats = fs.stat(filepath, function(err, stat) {
				if(err) {
					console.log('err on stat', err);
					return;
				}
				if(stat.isDirectory()) {
					getFiles(filepath, callback);
				} else {
					callback(filepath);
				}
			});
		})
	})
}

// Get a full filepath and check its data
var processFile = function(filepath) {		

	fs.stat(filepath, function(err, stat) {
		if(err) {
			console.log(err);
			return;
		}

		var sizeKo = stat.size / 1024;
		var sizeLimit = 0;
		if(sizeKo >  0) {
			//console.log(filepath, 'is > ', sizeLimit, ' Ko (', sizeKo , ')');
		}

		var filter = 'html';
		if(filepath.indexOf(filter) !== -1) {
			//console.log(filepath, 'contains', filter);
		}


		var limitInSeconds = 60;
		if( (new Date() - stat.ctime)/1000 < limitInSeconds) {
			console.log(filepath, 'has been created in last', limitInSeconds, 'seconds');
		}

		if( (new Date() - stat.mtime)/1000 < limitInSeconds) {
			console.log(filepath, 'has been modified in last', limitInSeconds, 'seconds');
		}

	})


}

getFiles('.', function(filepath) {
	processFile(filepath)
})