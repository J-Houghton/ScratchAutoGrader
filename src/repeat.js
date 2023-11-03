export function checkRepeatExists(astRootNode) {
    const repeatBlocks = astRootNode.findAllNodes(node => {
        return node.data.opcode === 'control_forever' || node.data.opcode === 'control_repeat' || node.data.opcode === 'control_repeat_until';
    });

    return repeatBlocks.length > 0 ? repeatBlocks : null;
}

export function checkIncorrectRepeatUsage(repeatBlocks) {
    const issues = [];
  
    // Check for nested forever blocks without additional blocks for logic between the two.
    repeatBlocks.forEach(repeatBlock => {
      const foreverBlocks = repeatBlock.findAllNodes(node => node.data.opcode === 'control_forever');
      if (foreverBlocks.length > 1) {
        issues.push({
          code: 'nested_forever_blocks',
          message: 'Nested forever blocks should have additional blocks for logic between the two.',
        });
      }
    });
  
    // Check for repeat x blocks inside of forever loops without additional logic between the two.
    repeatBlocks.forEach(repeatBlock => {
      const repeatXBlocks = repeatBlock.findAllNodes(node => node.data.opcode === 'control_repeat');
      if (repeatXBlocks.length > 0 && repeatBlock.data.opcode === 'control_forever') {
        issues.push({
          code: 'repeat_x_inside_forever_loop',
          message: 'Repeat x blocks inside of forever loops should have additional logic between the two.',
        });
      }
    });
  
    // Check for nested repeat x blocks without additional logic between the two.
    repeatBlocks.forEach(repeatBlock => {
      const nestedRepeatXBlocks = repeatBlock.findAllNodes(node => node.data.opcode === 'control_repeat');
      if (nestedRepeatXBlocks.length > 1) {
        issues.push({
          code: 'nested_repeat_x_blocks',
          message: 'Nested repeat x blocks should have additional logic between the two.',
        });
      }
    });
  
    // Check for forever blocks inside of repeat x blocks without additional logic between the two.
    repeatBlocks.forEach(repeatBlock => {
      const foreverBlocks = repeatBlock.findAllNodes(node => node.data.opcode === 'control_forever');
      if (foreverBlocks.length > 0 && repeatBlock.data.opcode === 'control_repeat') {
        issues.push({
          code: 'forever_inside_repeat_x_block',
          message: 'Forever blocks inside of repeat x blocks should have additional logic between the two.',
        });
      }
    });
  
    return issues.length > 0 ? issues : null;
  }

export function checkIncorrectRepeatUsage(repeatBlocks) { //can pass parameters of array of repeat blocks
    // if there is a forever inside of repeat x and no stop block
    
    repeatBlocks.forEach(nodeBlock => {
        if (nodeBlock.data.opcode === 'control_repeat' || nodeBlock.data.opcode === 'control_repeat_until') {
            const foreverBlocks = nodeBlock.findAllNodes(node => {
                return node.data.opcode === 'control_forever';
            });
            if (foreverBlocks.length > 0) {
                return true;
            }
        }
        if (nodeBlock.data.opcode === 'control_forever') {
            // if there is nested forever blocks without additional blocks for logic between the two
            // if there is a repeat x inside of a forever loop without addtion logic between the two
            //if there are nested forever blocks, there has to be a stop block for the inner block, (if there are nested forever with stop for inner, sholdn't user use forever with nested repeat?)
        }
    });
    // nested repeat loops should be able to exit 
    // should not have have empty repeat/forever blocks or only contain non functional blocks such as comments of disabled blocks
    // if there is a repeat x inside of a repeat x without addtion logic between the two
    // if there is a forever inside of repeat x without addtion logic between the two
    //  If there is a 'repeat x' inside of a 'forever' loop without additional logic between the two. 
    
    //combined ideas from above
    // If there is a 'repeat x', 'forever', or 'repeat until' nested inside another 'repeat x', 'forever', or 'repeat until' without additional logic between the two.
    // If there are nested 'forever' blocks, there has to be a 'stop' block for the inner block.
    // Nested 'repeat' or 'forever' loops should be able to exit.
    // Empty 'repeat' or 'forever' blocks or blocks that only contain non-functional elements such as comments or disabled blocks should be avoided.
    
    //return issues.length > 0 ? issues : null; 
}

function checkRepeatUntilUsage(astRootNode) {
    // Get all 'control_repeat_until' blocks from the AST
    // For each 'control_repeat_until' block:
        // Check if the condition is ever met
        // Check if the condition is modified inside the loop
        // Check if the block is empty or contains only non-functional blocks
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