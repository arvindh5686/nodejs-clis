#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise,
	text = process.argv[2];


function* echo() {
    // Use 'yield' in here
    // Your implementation here
    console.log(process.argv);
    console.log(yield fs.readFile(__filename, console.log));
    process.stdout.write(text);
}

module.exports = echo
