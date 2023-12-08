let currentTime = 0;
const actionsLog = {};

function simulateGreenFlagClick() {
    const greenFlagBlocks = findGreenFlagBlocks(); // Function to find all blocks triggered by the green flag
    greenFlagBlocks.forEach(block => {
        executeBlock(block);
    });

    console.log(actionsLog);
}

function executeBlock(block) {
    // Based on the type of block, perform the action
    // For example, if it's a 'change costume' block:
    if (block.type === 'changeCostume') {
        changeCostume(block);
    }
    // Add other conditions for different block types
}

function changeCostume(block) {
    // Change the costume of the sprite
    // Log the change
    actionsLog[currentTime] = `Costume changed to ${block.costumeName}`;
    currentTime++;
}

function findGreenFlagBlocks() {
    // Return a list of blocks that are triggered by the green flag
    // This will depend on how your AST represents these blocks
}

simulateGreenFlagClick();
