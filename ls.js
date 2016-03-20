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
  // Use 'yield' in here
  //console.log('Executing ls function...');

  let fileStat = yield fs.stat(rootPath);

  if(! fileStat.isDirectory()) {
	//process.stdout.write(rootPath + "\n");
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

function* main() {
	var test = yield ls(dir);
	console.log(test);
	//process.stdout.write(test);
}

module.exports = main