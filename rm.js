#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise,
	path = process.argv[2];


function* rm() {
	try {
		let fileStat = yield fs.stat(path);
		if(! fileStat.isDirectory()) {
			yield fs.unlink(path);
		} else {
			let dirArray = path.split('/');
			let dirPath = '.';
			for(let dir of dirArray) {
				if(dir === '.') continue;
				dirPath +=  "/" + dir;

				let fileNames = yield fs.readdir(dirPath);

				for (let fileName of fileNames) {
					let filePath = path.join(dirPath, fileName);
				    yield fs.unlink(filePath);
				}
				
				yield fs.unlink(dirPath);
			}
		}
	} catch(e) {
		process.stdout.write("File not found");
	}
}

module.exports = rm
