#!/usr/bin/env node

 
import { unzipSb3 } from './utils/sb3Unzipp.js';
import { Parser } from './utils/parser.js';
import { countBlockTypes, countBlocksByOpcode, countCharacters, seeCustomChanges /* findOrphans */ } from './count.js';
import { checkRepeatExists, checkIncorrectRepeatUsage } from './linter/repeat.js';
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


async function processSb3File(filePath) {
    try {
      const unzippedFilePath = await unzipSb3(filePath);
      const parser = new Parser();
      const astRootNode = await parser.parse(unzippedFilePath);
      const allTargets = astRootNode.findAllNodes(node => node.type === 'Target');
  
      console.log(allTargets);
    } catch (error) {
      // Handle errors that may occur during unzip or parse
      console.error(error);
    }
  }
  
  // Call the function with your filePath
  processSb3File(filePath);
  

// unzipSb3(filePath)
//     .then(async (unzippedFilePath) => {
//         const parser = new Parser(); 
//         try {
//             const astRootNode = await parser.parse(unzippedFilePath);  
//             const allTargets = astRootNode.findAllNodes(node => node.type === 'Target');

//             console.log(allTargets);

//             // astRootNode.children.forEach(child => {
//             //     console.log(child); 
//             // });

//             // const counts = countBlockTypes(astRootNode);
//             // console.log("Number of unique block types:", counts);

//             // const uniqueBlockCount = Object.keys(counts).length; 
//             // console.log("Total unique block types: ", uniqueBlockCount);

//             // Test strings for opcode
//             // const testOpcodes = ["control", "looks_nextcostume"];

//             // testOpcodes.forEach(opcode => {
//             //     const count = countBlocksByOpcode(counts, opcode);
//             //     console.log(`Count of blocks for opcode "${opcode}": `, count);
//             // });

//             // const analysisResult = findOrphans(astRootNode);
//             // console.log("nonorphans: ", analysisResult.nonOrphans);
//             // console.log("orphans: ", analysisResult.orphans);
//             // const nodes = astRootNode.findAllNodes(node => node.data.opcode === "control_repeat_until"); 
//             // //console.log("node: ", node); 
//             // const repeatBlocks = checkRepeatExists(astRootNode);
//             // repeatBlocks.forEach(block => {
//             //     console.log(block.data.opcode);
//             // });

//             // console.log("Correct Code Sprite Count: ", countCharacters(astRootNode));

//             // console.log(seeCustomChanges(astRootNode));

//             // console.log("Stage Count: " + countStages(astRootNode));

//             /*
//             const analysisResult = findOrphans(astRootNode);
//             console.log("nonorphans: ", analysisResult.nonOrphans);
//             console.log("orphans: ", analysisResult.orphans);
//             */
//             // orphanSort('output_ast.json');
//             // const issues = checkIncorrectRepeatUsage(repeatBlocks);
//             // console.log("issues: ", issues);
//             // orphanSort('output_ast.json');
//         } catch (error) {
//             console.error("An error occurred during index.js: ", error);
//         } 
//     })
//     .catch(error => {
//         console.error("An error occurred for unzip:", error);
//     });
