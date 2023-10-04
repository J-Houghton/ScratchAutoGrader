#!/usr/bin/env node

const { file } = require("jszip");

// Grab the file path from command-line arguments
const filePath = process.argv[2]; 

if (!filePath) {
    console.error("Please provide a file path as an argument.");
    process.exit(1);
}
console.log(filePath);
//const string = await filepath.readFile(filePath, 'utf-8');
const data = require('./' + filePath);

const objects = data.targets;
for (let i = 0; i < objects.length; i++) {
    var blocks = objects[i].blocks;
    //var top = true;
    console.log(blocks);
    Object.keys(blocks).forEach((element) => console.log(element));
}

