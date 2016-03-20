#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise,
	fileName = process.argv[2];


function* cat() {
    let content = yield fs.readFile(fileName, 'utf-8');
    process.stdout.write(content);
}

module.exports = cat
