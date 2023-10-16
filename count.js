/* Enum for the Different Types of Blocks */
const BlockType =
{
    Motion: "motion",
    Looks: "looks", 
    Sound: "sound",
    Event: "event",
    Control: "control",
    Sensing: "sensing",
    Operator: "operator",
    Variable: "data",
    Music: "music"
}

const output = require('./output');

/*
let amount = CountBlockPerType(output, "sound");
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
                if (code.length > 2 && code[2] == "menu") { continue; }
                if (code[0] == type) { blockAmount++; }
            }
        }
    }

    return blockAmount;
}

/**
 * Counts the amount of different types of blocks in the file
 * @param {*} json The output file with the AST tree
 * @returns The amount of different types of blocks
 */
function CountDifferentBlockTypes(json) 
{
    const targets = json.targets;
    let blockTypes = {};

    for (let type in BlockType) { blockTypes[BlockType[type]] = 0; }

    for (let i = 0; i < targets.length; i++)
    {
        let blocks = json.targets[i].blocks;
        if (blocks != undefined)
        {
            for (let block in blocks) 
            {
                let opcode = blocks[block].opcode;
                const code = opcode.split("_");
                
                if (blockTypes[code[0]] == 0) {
                    blockTypes[code[0]]++;
                }
            }
        }
    }

    let total = 0;

    for (let type in blockTypes) { total += blockTypes[type]; }

    return total;
}

exports.CountBlockPerType = CountBlockPerType;
exports.CountDifferentBlockTypes = CountDifferentBlockTypes;