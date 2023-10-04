#!/usr/bin/env node

const unzipSb3 = require('./sb3Unzipp');

// Grab the file path from command-line arguments
const filePath = process.argv[2]; 

if (!filePath) {
    console.error("Please provide a file path as an argument.");
    process.exit(1);
}

unzipSb3(filePath)
    .then((unzippedFilePath) => {
        const parse = require('./parser');
        parse(unzippedFilePath).catch(error => {
            console.error("An error occurred for parse:", error);
        });
    })
    .catch(error => {
        console.error("An error occurred for unzip:", error);
    });
