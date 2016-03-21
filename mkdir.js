#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise,
	dirPath = process.argv[2];


function* mkdir() {
	let dirArray = dirPath.split('/');
	let path = '.';
	for(let dir of dirArray) {
		if(dir === '.') continue;
		path +=  "/" + dir;
		try {
			yield fs.stat(path);
		} catch(e) {
			yield fs.mkdir(path);
		}
	}
}

module.exports = mkdir
