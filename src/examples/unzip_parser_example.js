import { unzipSb3 } from './utils/sb3Unzipp.js';
import { Parser } from './utils/parser.js';

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