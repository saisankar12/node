var fs = require('fs')

function processFile(filepath) {

	if(filepath.indexOf('_Web_0') === -1) {
		return;
	}

	var newName = filepath.replace('_Web_0', '');

	newName = newName.replace('./', './champions_');
	
	console.log(filepath, '->', newName);

	fs.rename(filepath, newName, function (err) {
  		if (err) throw err;
  		console.log('renamed complete');
	});
}


function getFiles (dir) {
	var files = fs.readdirSync(dir);

	files.forEach(function(file) {
		var name = dir + '/' + file;
		if (fs.statSync(name).isDirectory()) {
			getFiles(name);
		} else {
			processFile(name);		
		}
	})
}


getFiles('.')