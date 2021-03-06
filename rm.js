#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise,
	ls = require('./ls'),
	path = process.argv[2];


function* rm() {
	try {
		let fileStat = yield fs.stat(path);
		if(! fileStat.isDirectory()) {
			yield fs.unlink(path);
		} else {
			//get all the files recursively
			let files = yield ls(path, true);
			for (let fileName in files) {
				yield fs.unlink(files[fileName]);
			}
		}

		yield deleteDir(path);
	} catch(e) {
		console.log(e);
		process.stdout.write("File not found");
	}
}

function* deleteDir(path) {
	let dirArray = yield fs.readdir(path);
	if (dirArray.length) {
		for (let i=0; i<dirArray.length; i++) {
			yield deleteDir(path + '/' + dirArray[i]);
		}
	}
	yield fs.rmdir(path);
	
}

module.exports = rm
