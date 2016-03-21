#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise,
	fileName = process.argv[2];


function* touch() {
    var d = new Date();
    let fd = yield fs.open(fileName, 'r');
    yield fs.futimes(fd, d, d);
}

module.exports = touch
