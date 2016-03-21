#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise,
	log = process.stdout.promise,
	text = process.argv[2];


function* echo() {
    yield log.write(text + "\n");
}

module.exports = echo
