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

