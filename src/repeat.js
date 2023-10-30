export function checkRepeatExists(astRootNode) { //return an array of repeat blocks?
    const targets = astRootNode.root.children;
    let repeatBlocks = []; 
    
    for (let i = 0; i < targets.length; i++) {
        var blocks = targets[i].children;
        var blockKeys = Object.keys(blocks);
        for (let i = 0; i < blockKeys.length; i++) {
            var name = blockKeys[i];
            var opcode = blocks[name]['opcode'];
            if (opcode == 'control_forever' || opcode == 'control_repeat' || opcode == 'control_repeat_until') {
                repeatBlocks.push(blocks[name]);
            }
        }
    }
    return repeatBlocks.length > 0 ? repeatBlocks : false;
}

export function checkIncorrectRepeatUsage(astRootNode) { //can pass parameters of array of repeat blocks
    // if there is a forever inside of repeat x and no stop block
    // if there is nested forever blocks without additional blocks for logic between the two
    // nested repeat loops should be able to exit 
    // if there is a repeat x inside of a forever loop without addtion logic between the two
}

//need to use along side of checkIncorrectRepeatUsage, if used all repeat correct(maybe above function return true) 
//then check if there is only one children for repeat that is not another control block? 
export function checkSingleBlockInsideOfRepeat(astRootNode) { //can pass parameters of array of repeat blocks
    
}

//same as above but more than one children?, below function might not be needed if above reutrns true and false, multiple blocks inside of repeat not counting control(repeat) blocks.
export function checkMultipleBlockInsideOfRepeat() {
    return checkSingleBlockInsideOfRepeat();
}

export function checkGreatRepeatUsage() {
    //if(!checkIncorrectRepeatUsage())
        //user should be using nested repeat blocks correctly, where the nested repeat block is able to exit
        //nested blocks should do something between each other
}