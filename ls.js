#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper');
let path = require('path');
let argv = require('yargs').argv;
let dir = process.argv[2];
let isRecurive = process.argv[3];
let co = require('co');
let _ = require('lodash');


let fs = require('fs').promise;

ls = co.wrap(ls);

function* ls(rootPath) {
  let fileStat = yield fs.stat(rootPath);

  if(! fileStat.isDirectory()) {
	return [rootPath];
  }

	let fileNames = yield fs.readdir(rootPath);
  // Sub-directory case
	let lsPromises = []
	for (let fileName of fileNames) {
		let filePath = path.join(rootPath, fileName);
	    let promise = yield ls(filePath)
	    lsPromises.push(promise)
	}
	// The resulting array needs to be flattened
	return yield Promise.all(_.flatten(lsPromises));
}

function* main(dirPath) {
	dirPath = dirPath || dir;
	let files = yield ls(dirPath);
	console.log(files);
	return files;
//	process.stdout.write(files);
}

module.exports = main