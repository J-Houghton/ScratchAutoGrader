/* Enum for the Different Types of Blocks */
const BlockType =
{
    Motion: "motion",
    Looks: "looks", 
    Sound: "sound",
    Events: "events",
    Control: "control",
    Sensing: "sensing",
    Operators: "operators",
    Variables: "variables",
    Music: "music"
}

/* Tests
const output = require('./output');

let amount = CountBlockPerType(output, "control");
let diffAmount = CountDifferentBlockTypes(output);
console.log("CountBlockPerType(): " + amount);
console.log("CountDifferentBlockTypes(): " + diffAmount);
*/

/**
 * Counts the amount of blocks of a specific type
 * @param {*} json The output file with the AST tree
 * @param {*} type The type of block you want to count
 * @returns The amount of blocks of the specified type
 */
function CountBlockPerType(json, type)
{
    let blockAmount = 0;
    const targets = json.targets

    for (let i = 0; i < targets.length; i++)
    {  
        let blocks = json.targets[i].blocks;
        if (blocks != undefined) 
        {
            for (let block in blocks)
            {
                let opcode = blocks[block].opcode;      
                const code = opcode.split("_");
                if (code[0] == type) { blockAmount++; }
            }
        }
    }

    return blockAmount;
}

export function countBlockTypes(ast) {
    // Find all nodes of type 'Block'
    const allBlocks = ast.findAllNodes(node => node.type === 'Block');

    const counts = {};
    allBlocks.forEach(block => {
        const type = block.data.opcode; 
        counts[type] = (counts[type] || 0) + 1;
    });

    return counts; // This object will have keys as block types and values as their counts
}

export function countBlocksByOpcode(counts, criteria) {
    // Check if the criteria match the start or the whole of any opcode
    return Object.keys(counts)
        .filter(opcode => opcode === criteria || opcode.startsWith(criteria))
        .reduce((total, key) => total + counts[key], 0);
}


export function findOrphans(projectData) {
    const orphans = [];
    const nonOrphans = [];
    const unDecided = [];

    const targets = projectData.root.children;
   // console.log(targets);
    for (let i = 0; i < targets.length; i++) {
        var blocks = targets[i].children;
        var unDecidedSub = [];
        var blockKeys = Object.keys(blocks);

        for (let i = 0; i < blockKeys.length; i++) {
            var name = blockKeys[i];
            var opcode = blocks[name]['opcode'];
            var topLevel = blocks[name]['topLevel'];

            if(topLevel == true){
                if(opcode == 'event_whenflagclicked' || opcode == 'event_whenkeypressed' || opcode == 'event_whenstageclicked' 
                || opcode == 'event_whenbackdropswitchesto' || opcode == 'event_whengreaterthan' || opcode == 'event_whenbroadcastreceived'){
                    nonOrphans.push(name);
                }
                else{
                    orphans.push(name);
                }
            }
            else{ 
                if(!unDecided.includes(name)){
                    unDecidedSub.push(name); 
                }
            }
        }
        unDecided.push(unDecidedSub);
    }
    console.log(targets);
    for (let i = 0; i < targets.length; i++) {
        var blocks = targets[i].children;
        var blockKeys = Object.keys(blocks);
        var unDecidedSub = unDecided[i];
        for(let i = 0; i < unDecidedSub.length; i++){
            var blockName = unDecidedSub[i];
            if(blocks[blockName].parent == null){
                console.log("Null parent error");
            }
            else if(orphans.includes(blocks[blockName].parent)){
                orphans.push(blockName);
            }
            else if(nonOrphans.includes(blocks[blockName].parent)){
                nonOrphans.push(blockName);
            }
            else{console.log(blockName)}
        }
    }

    return {
        nonOrphans,
        orphans
    };
}