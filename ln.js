#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
//songbird library lets us creating promises on any object/lib
let fs = require('fs').promise,
	log = process.stdout.promise,
	srcPath = process.argv[2],
	destPath = process.argv[3];


function* ln() {
	yield fs.symlink(srcPath, destPath);
}

module.exports = ln
