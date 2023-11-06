export function checkRepeatExists(astRootNode) {
    const repeatBlocks = astRootNode.findAllNodes(node => {
        return node.data.opcode === 'control_forever' || node.data.opcode === 'control_repeat' || node.data.opcode === 'control_repeat_until';
    });

    return repeatBlocks.length > 0 ? repeatBlocks : null;
}

export function checkIncorrectRepeatUsage(repeatBlocks) {
    const issues = []; 

    repeatBlocks.forEach(repeatBlock => { 
      const target = repeatBlock.getTarget();
      let targetName = target.name;
      // Check for empty loops or loops with only non-functional elements.
      if (isLoopEmptyOrNonFunctional(repeatBlock)) {
        const controlBlockName = getControlBlockName(repeatBlock.data.opcode);
        const errorMessage = `The ${controlBlockName} control block from ${targetName} is empty or contains only non-functional elements.`;
        issues.push({ code: 'empty_or_non_functional_loop', message: errorMessage });
      } else if (repeatBlock.data.opcode === 'control_forever') {  // If there are nested 'forever' blocks, there has to be a 'stop' block for the inner block.
        const hasNestedForeverWithoutStop = findNestedControlForeverWithoutStop(repeatBlock);
        if (hasNestedForeverWithoutStop) { 
          const errorMessage = `The ${targetName} have nested forever blocks without a stop block`;
          issues.push({ code: 'nested_forever_without_stop', message: errorMessage });
        }
      }  

      if (['control_repeat', 'control_forever'].includes(repeatBlock.data.opcode)) { //'repeat' or 'forever' loops should be able to exit. 
        const canExit = checkForExitCondition(repeatBlock);
        if (!canExit) { 
          const errorMessage = `The ${targetName} block should be able to exit.`;
          issues.push({ code: 'no_exit_condition', message: errorMessage });
        }
      }
      //Empty 'repeat' or 'forever' blocks or blocks that only contain non-functional elements such as comments or disabled blocks should be avoided.
    });
    


    return issues.length > 0 ? issues : null;
}

//Do not need to implement for control_forever, already checking exit conditon for nested forever blocks
//a single forever loop might be aimed to run indefinitely, but if there is a nested forever block, it should be able to exit
function checkForExitCondition(block) {
  return true;
}

function isLoopEmptyOrNonFunctional(block) {
  if (block.children.length === 0 || block.children.every(isNonFunctionalBlock)) {
    return true;
  }
  return false;
}

function getControlBlockName(opcode) {
  const opcodeNames = {
    'control_forever': 'forever',
    'control_repeat_until': 'repeat until',
    'control_repeat': 'repeat x'
  }; 
  return opcodeNames[opcode] || 'unknown block';
}

function isNonFunctionalBlock(block) { 
  // NEED to define other non-functional blocks
  return block.data.opcode === "comment";
}

function findNestedControlForeverWithoutStop(block, depth = 0) {
  // Check if the block is a 'control_forever' and has children
  if (block.data && block.data.opcode === "control_forever") {
    // found a 'control_forever', now check for nested 'control_forever' without a 'stop' recursively
    const hasNestedForeverWithoutStop = block.children.some(child => checkForNestedForeverWithoutStop(child, depth + 1));
    if (hasNestedForeverWithoutStop) {
      return true;
    }
  } else if (block.children) {
    // If this is not a 'control_forever' block, recursively check its children
    for (const child of block.children) {
      if (findNestedControlForeverWithoutStop(child, depth + 1)) {
        return true;
      }
    }
  }
  return false;
}

//When findNestedControlForeverWithoutStop encounters a control_forever block, it calls checkForNestedForeverWithoutStop on its children.
//checkForNestedForeverWithoutStop looks for a nested control_forever among all children, going deeper into each layer.
//If a control_forever is found by checkForNestedForeverWithoutStop, it uses findStopBlock to check for a stop block among all its children, going deeper into each layer.
function checkForNestedForeverWithoutStop(block, depth) {
  // If we find a nested 'control_forever' block, check for absence of 'stop' blocks in its children
  if (block.data && block.data.opcode === "control_forever") {
    return !block.children || !block.children.some(child => findStopBlock(child, depth + 1));
  } else if (block.children) {
    // Otherwise, keep looking in its children
    return block.children.some(child => checkForNestedForeverWithoutStop(child, depth + 1));
  }

  return false;
}

function findStopBlock(block, depth) {
  // Check if this block is a 'stop' block
  if (block.data && block.data.opcode === "control_stop") { 
    return true;
  }

  // Recursively check the children for a 'stop' block
  if (block.children) {
    return block.children.some(child => findStopBlock(child, depth + 1));
  }

  return false;
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
export function checkSingleBlockInsideOfRepeat(repeatBlocks) { //can pass parameters of array of repeat blocks
    const issues = [];
  
    // Check for nested forever blocks without additional blocks for logic between the two.
    repeatBlocks.forEach(repeatBlock => {
      const foreverBlocks = repeatBlock.findAllNodes(node => node.data.opcode === 'control_forever');
      if (repeatBlock.children.length == 1) {
        return true;
      }
    });
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