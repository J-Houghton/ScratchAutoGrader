//Mutations are present on blocks where the opcode property is equal to "procedures_call" (i.e custom blocks)
// add case for music case  
function countByBlockTypes(json) {
    try {
        let blocks = json.targets[index].blocks; //for loop targets.length
        let blockTypes = {}; 
        for (let block in blocks) {
            let opcode = blocks[block].opcode;
            if (blockTypes[opcode] === undefined) {
                //blockTypes[opcode] = 1;
            } else {
                blockTypes[opcode]++;
            }
        }
        return blockTypes.length;
    } catch (error) {
        console.log(error);
    }
}