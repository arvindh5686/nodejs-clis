#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
//songbird library lets us creating promises on any object/lib
let fs = require('fs').promise,
	log = process.stdout.promise,
	text = process.argv[2];


function* echo() {
	//since we use songbird, log.write now returns a promise. yield works only with promises
    yield log.write(text + "\n");
}

module.exports = echo
