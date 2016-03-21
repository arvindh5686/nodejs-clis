#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
//songbird library lets us creating promises on any object/lib
let fs = require('fs').promise,
	fileName = process.argv[2];


function* cat() {
	//since we use songbird, fs.readfile now returns a promise. yield works only with promises
    let content = yield fs.readFile(fileName, 'utf-8');
    process.stdout.write(content);
}

module.exports = cat
