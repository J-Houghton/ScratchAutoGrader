#!/usr/bin/env node

 
import { unzipSb3 } from './sb3Unzipp.js';
import { Parser } from './parser.js';

// Grab the file path from command-line arguments
const filePath = process.argv[2]; 

if (!filePath) {
    console.error("Please provide a file path as an argument.");
    process.exit(1);
}

unzipSb3(filePath)
    .then(async (unzippedFilePath) => {
        const parser = new Parser(); 
        try {
            const ast = await parser.parse(unzippedFilePath);
            console.log(ast);
        } catch (error) {
            console.error("An error occurred during parsing: ", error);
        } 
    })
    .catch(error => {
        console.error("An error occurred for unzip:", error);
    });
