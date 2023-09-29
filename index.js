#!/usr/bin/env node
//needed to run file as a script ./index.js


//Note, make index to be take parameter(file path) and set up logic to parse the json file from
//unzip output 

const unzipSb3 = require('./sb3Unzipp');

const filePath = './sb3Files/helloWorld.sb3'; // You can change this to any desired path

unzipSb3(filePath).catch(error => {
    console.error("An error occurred for unzip:", error);
});

const sb3filePath = './unzippedSb3/project.json';

// need to make sure .json exist 
const parse = require('./parser');
parse(sb3filePath).catch(error => {
    console.error("An error occurred for parse:", error);
});