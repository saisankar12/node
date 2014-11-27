
var chain = "g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj. "
chain = 'map.html'

var line = '';
for (var i = chain.length - 1; i >= 0; i--) {

	var ascii = chain[i].charCodeAt();

	if(ascii > 120) {
		ascii -= 24;
	} else if(ascii >= 63) {
		ascii += 2;
	}

	line = String.fromCharCode(ascii) + line;
};

console.log(line);

