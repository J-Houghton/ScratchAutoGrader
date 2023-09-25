const fs = require('fs').promises;
const { toScratchblocks } = require('parse-sb3-blocks');

//const projectJSON = require('./unzippedSb3/project.json');

async function parse(filePath) {
    console.log("parsing...");
    console.log(filePath);
    
    // Read and parse the JSON file
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const projectJSON = JSON.parse(jsonData);
    const blocks = projectJSON.blocks;

    // Here the filtering of blocks can be done based on opcode
    const whenGreenflag = Object.keys(blocks).filter(key => blocks[key].opcode === 'event_whenflagclicked')[0];

    const scratchblocksCode = toScratchblocks(whenGreenflag, blocks, 'en', {tab: '  '});
    console.log(scratchblocksCode);
}

module.exports = parse;