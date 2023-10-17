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
        const type = block.data.opcode; // Assuming 'opcode' represents the type of the block
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


export function findOrphans(ast) {
    const orphans = [];

    // We're looking for nodes of type 'Block' that meet the orphan criteria
    const allBlocks = ast.findAllNodes(node => node.type === 'Block');

    allBlocks.forEach(blockNode => {
        const { opcode, topLevel } = blockNode.data;

        if (topLevel && ![
            'event_whenflagclicked', 'event_whenkeypressed', 'event_whenstageclicked',
            'event_whenbackdropswitchesto', 'event_whengreaterthan', 'event_whenbroadcastreceived'
        ].includes(opcode)) {
            orphans.push(blockNode);
        }
    });

    return orphans;
}