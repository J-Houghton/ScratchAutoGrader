#!/usr/bin/env node

 
import { unzipSb3 } from './sb3Unzipp.js';
import { Parser } from './parser.js';
import { countBlockTypes, countBlocksByOpcode, findOrphans } from './count.js';
import { orphanSort } from './orphans.js';

// Grab the file path from command-line arguments
const filePath = process.argv[2]; 

if (!filePath) {
    console.error("Please provide a file path as an argument.");
    process.exit(1);
}

// Input Validation
const fileName = filePath; 
var extension = fileName.substring(fileName.lastIndexOf('.')+1, fileName.length) || fileName;
console.log(extension);
if(extension != 'sb3'){
    console.log("Incorrect File Extention: " + extension);
    process.exit(1);
}

unzipSb3(filePath)
    .then(async (unzippedFilePath) => {
        const parser = new Parser(); 
        try {
            const astRootNode = await parser.parse(unzippedFilePath);  
            console.log(astRootNode);
            const counts = countBlockTypes(astRootNode);
            console.log("Number of unique block types:", counts);

            const uniqueBlockCount = Object.keys(counts).length; 
            console.log("Total unique block types: ", uniqueBlockCount);

            // Test strings for opcode
            const testOpcodes = ["control", "looks_nextcostume"];

            testOpcodes.forEach(opcode => {
                const count = countBlocksByOpcode(counts, opcode);
                console.log(`Count of blocks for opcode "${opcode}": `, count);
            });

            orphanSort(astRootNode);

        } catch (error) {
            console.error("An error occurred during index.js: ", error);
        } 
    })
    .catch(error => {
        console.error("An error occurred for unzip:", error);
    });
