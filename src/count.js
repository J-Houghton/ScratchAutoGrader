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
 * Counts block types and puts them in a dictionary
 * @param {AST} ast 
 * @returns {Dictionary} A dictionary with keys as block types and values as counts
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
 * @param {Dictionary} counts A dictionary with keys as block types and values as counts
 * @param {string} criteria What you are checking that an opcode includes
 * @returns {int} How many blocks have the criteria
 */
export function countBlocksByOpcode(counts, criteria) {
    // Check if the criteria match the start or the whole of any opcode
    return Object.keys(counts)
        .filter(opcode => opcode === criteria || opcode.startsWith(criteria))
        .reduce((total, key) => total + counts[key], 0);
}

/**
 * Counts the amount of characters(sprites) in a scratch project that have correct code
 * @param {AST} ast An ast tree of the scratch project
 * @returns {int} An integer of the amount of characters(sprites) a project has
 */
export function countCharacters(ast) {
    const allTargets = ast.findAllNodes(node => node.type === 'Target');

    let validCharacterCount = 0;

    allTargets.forEach(target => {
        if (target.data.isStage === false) { 
            // console.log("Sprite: " + target.data.name);
            let blockArray = new Array();
            returnTargetBlocks(target, blockArray);   
            if (checkCode(blockArray) === true) { validCharacterCount++; }
        }       
    });

    return validCharacterCount;
}

/**
 * Finds all custom changes in an ast
 * @param {AST} ast 
 * @returns {Array<string>} An array of strings that show effects that different sprites have
 */
export function seeCustomChanges(ast) {
    const allTargets = ast.findAllNodes(node => node.type === 'Target');

    let customChanges = new Array();

    allTargets.forEach(target => {
        let blockArray = new Array();
        returnTargetBlocks(target, blockArray);
        // console.log(target.data.name);
        // console.log(target.data.blocks);
        blockArray.forEach(block => {
            if (block.data.opcode != undefined) { 
                if (block.data.opcode === "looks_changeeffectby" || block.data.opcode === "looks_seteffectto") {
                    // console.log(block.data.fields.EFFECT[0]);
                    let newString = target.data.name + ": " + block.data.opcode + " - " + block.data.fields.EFFECT[0]; 
                    if (hasEventBlock(block)) { customChanges.push(newString); }
                }
            }
        })
    })

    return customChanges;
}

/**
 * Gets all the code blocks in a specific target (Stage or Sprite)
 * @param {Node} targetNode The target you are trying to get the code blocks of
 * @param {Array} targetBlocks A preinitialized array of the blocks in a target
 */
function returnTargetBlocks(targetNode, targetBlocks)
{
    targetNode.children.forEach(child => {
        if (child.type === "Block") { targetBlocks.push(child); }
        returnTargetBlocks(child, targetBlocks);
    })
}

/** 
 * Checks to see if the code has an event block and a motion, looks, or sound block
 * @param {Array} blockArray An array of blocks for a target
 * @returns {bool} True or false of whether the code is valid
 */
function checkCode(blockArray) {
    let subTotalCount = 0;
    let eventCount = 0; 

    blockArray.forEach(block => {
        // console.log(block.data.opcode);
        if (block.data.parent != null) {
            // console.log(block.data.opcode);
            if (!block.data.opcode.endsWith("menu")) {
                if (block.data.opcode.startsWith("motion")) { subTotalCount++; }
                if (block.data.opcode.startsWith("looks")) { subTotalCount++; }
                if (block.data.opcode.startsWith("sound")) { subTotalCount++; }      
            }
        }

        if (block.data.opcode.startsWith("event")) { eventCount++; }
    });

    if (eventCount > 0 && subTotalCount > 0) { return true; }
    else { return false; }
}

/**
 * Checks to see whether a block is connected to an event block and is run in the code
 * @param {Block} block 
 * @returns {bool} Whether the block has an event block
 */
function hasEventBlock(block) {
    // console.log("Checking for event block:" + block.data.parent);
    if (block.data.parent === null) { 
        if (block.data.opcode.startsWith("event")) { return true; }
        else { return false; }
    }
    else { if (hasEventBlock(block.parent)) { return true; } } 
}

export function countStages(ast)
{
    const allTargets = ast.findAllNodes(node => node.type === 'Target')

    let stageCount = 1;

    allTargets.forEach(target => 
    {
        if (target.data.isStage === true) { stageCount = target.data.costumes.length }
    })

    return stageCount;
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