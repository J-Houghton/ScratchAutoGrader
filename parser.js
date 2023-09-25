const fs = require('fs').promises;
const { toScratchblocks } = require('parse-sb3-blocks');

//const projectJSON = require('./unzippedSb3/project.json');

async function parse(filePath) {
    console.log("parsing...");
    console.log(filePath);
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const projectJSON = JSON.parse(jsonData);

    const stage = projectJSON.targets.filter(t => t.isStage)[0];
    const whenGreenflag = Object.keys(stage.blocks).filter(key => stage.blocks[key].opcode === 'event_whenflagclicked')[0];

    const scratchblocksCode = toScratchblocks(whenGreenflag, stage.blocks, 'en', {tab: '  '});
    console.log(scratchblocksCode);
}

module.exports = parse;