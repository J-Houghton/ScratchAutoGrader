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
/*
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
*/

/**
 * Counts block types and puts them in a dictionary
 * @param {A json file of an ast tree of the project} ast 
 * @returns A dictionary with keys as block types and values as counts
 */
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

/**
 * Checks to see if a criteria is in a block
 * @param {Dictionary?} counts 
 * @param {What you are checking that an opcode includes} criteria 
 * @returns 
 */
export function countBlocksByOpcode(counts, criteria) {
    // Check if the criteria match the start or the whole of any opcode
    return Object.keys(counts)
        .filter(opcode => opcode === criteria || opcode.startsWith(criteria))
        .reduce((total, key) => total + counts[key], 0);
}

/**
 * Counts the amount of characters(sprites) in a scratch project that have correct code
 * @param {An ast tree of the scratch project} ast 
 * @returns An integer of the amount of characters(sprites) a project has
 */
export function countCharacters(ast) {
    const allTargets = ast.findAllNodes(node => node.type === 'Target');

    let validCharacterCount = 0;

    allTargets.forEach(target => {
        if (target.data.isStage === false) 
        { 
            console.log("Sprite: " + target.data.name);
            let blockArray = returnTargetBlocks(target);   
            if (checkCode(blockArray) === true) { validCharacterCount++; }
        }       
    });

    return validCharacterCount;
}

// export function countStages(ast)
// {
//     const allTargets = ast.findAllNodes(node => node.type === 'Target')

//     let stageCount = 0;

//     allTargets.forEach(target => {
//         if (target.data.isStage === true) { stageCount++; }
//     })

//     /*
//     for (let i = 0; i < childArray.length; i++) { 
//         //console.log(childArray[i])
//         if (childArray[i].data.isStage === true) { stageCount++; }
//     }
//     */

//     return stageCount;
// }

export function seeCustomChanges(ast) {
    const allTargets = ast.findAllNodes(node => node.type === 'Target');

    let customChanges = new Array();

    allTargets.forEach(target => {

        let blockArray = returnTargetBlocks(target);
        // console.log(target.data.name);
        // console.log(target.data.blocks);
        blockArray.forEach(block => {
            if (block.data.opcode != undefined) { 
                if (block.data.opcode === "looks_changeeffectby" || block.data.opcode === "looks_seteffectto") {
                    // console.log(block.data.fields.EFFECT[0]);
                    checkForEventBlock(block);
                    let newString = target.data.name + ": " + block.data.opcode + " - " + block.data.fields.EFFECT[0]; 
                    customChanges.push(newString);
                }
            }
        })
    })

    return customChanges;
}

/*
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
*/

/**
 * Gets all the code blocks in a specific target (Stage or Sprite)
 * @param {The target you are trying to get the code blocks of} targetNode 
 * @returns An array of code blocks for the specified target
 */
function returnTargetBlocks(targetNode)
{
    let targetBlocks = new Array();

    targetNode.children.forEach(child => {
        if (child.type === "Block") { targetBlocks.push(child); }
    })

    return targetBlocks;
}

/** 
 * Checks to see if the code has an event block and a motion, looks, or sound block
 * @param {An array of blocks for a target} blockArray 
 * @returns True or false of whether the code is valid
 */
function checkCode(blockArray)
{
    // Creates a 
    let subTotalCount = 0;
    let eventCount = 0; 

    blockArray.forEach(block => {
        if (block.data.parent != null)
        {
            if (!block.data.opcode.endsWith("menu"))
            {
                if (block.data.opcode.startsWith("motion")) { subTotalCount++; }
                if (block.data.opcode.startsWith("looks")) { subTotalCount++; }
                if (block.data.opcode.startsWith("sound")) { subtotalCount++; }      
            }
        }

        if (block.data.opcode.startsWith("event")) { eventCount++; }
    });

    if (eventCount > 0 && subTotalCount > 0) 
    { 
        return true;
    }
    else { return false; }
}

function checkForEventBlock(block)
{
    console.log("Checking for event block:" + block.data.parent);
    if (block.data.parent === null) 
    { 
        if (block.data.opcode.startsWith("event")) { console.log(block.data.opcode); return true; }
        else { return false; }
    }
    else { checkForEventBlock(block.parent); } 
}