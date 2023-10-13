//Mutations are present on blocks where the opcode property is equal to "procedures_call" (i.e custom blocks)
// add case for music case  
function countByBlockTypes(json, index) {
    try {
        let blocks = json.targets[index].blocks;
        let blockTypes = {};

        for (let blockId in blocks) {
            let block = blocks[blockId];
            let opcode = block.opcode;
            if (blockTypes[opcode] === undefined) {
                blockTypes[opcode] = 1;
            } else {
                blockTypes[opcode]++;
            }
        }

        return blockTypes;
    } catch (error) {
        console.error(error);
        return {}; // Return an empty object in case of an error
    }
} // need to check type_name, type only. 

function printBlockTypes(blockTypes) {
    Object.keys(blockTypes).forEach(opcode => {
        console.log(`Block Type: ${opcode}, Count: ${blockTypes[opcode]}`);
    });
}
const json = require("./output.json");
const blockTypes = countByBlockTypes(json, 0);

// Call the function with your blockTypes object
printBlockTypes(blockTypes);
