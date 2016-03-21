#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
//songbird library lets us creating promises on any object/lib
let fs = require('fs').promise,
	keyword = process.argv[2],
	fileName = process.argv[3];


function* grep() {
	//since we use songbird, fs.readfile now returns a promise. yield works only with promises
    let content = yield fs.readFile(fileName, 'utf-8');
    let lines = content.split("\n");

    for(let line of lines) {
    	if(line.includes(keyword)) {
    		process.stdout.write(line + "\n");
    	}
    }
}

module.exports = grep
