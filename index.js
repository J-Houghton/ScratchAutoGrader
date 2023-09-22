#!/usr/bin/env node
//needed to run file as a script ./index.js

const unzipSb3 = require('./sb3Unzipp');

const filePath = './sb3Files/3-hello.sb3'; // You can change this to any desired path

unzipSb3(filePath).catch(error => {
    console.error("An error occurred:", error);
});


