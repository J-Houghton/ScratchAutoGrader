#!/usr/bin/env node

const { waitForDebugger } = require('inspector');
const orphanSort = require('./orphans');
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
    .then(() => {
        sleep(500).then(() => { orphanSort('output.json') });
    })
    .then((unzippedFilePath) => {
    })
    .catch(error => {
        console.error("An error occurred for unzip:", error);
    });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }