#!/usr/bin/env node

export function checkParallelExists(astRootNode){
    const starterBlocks = astRootNode.findAllNodes(node => {
        return node.data.opcode === 'event_whenflagclicked' || node.data.opcode === 'event_whenkeypressed' || node.data.opcode === 'event_whenbackdropswitchesto' ||
        node.data.opcode === 'event_whenstageclicked' || node.data.opcode === 'event_whenbroadcastreceived' || node.data.opcode === 'event_whengreaterthan' || node.data.opcode === 'control_start_as_clone';
    });

    return starterBlocks.length > 0 ? starterBlocks : null;
}

export function checkParallelism(astRootNode){

    const targets = astRootNode.root.data.targets;
    const chars = [];
    targets.forEach(target => {
        if(target.isStage !== true){
            chars.push(target);
        }
    });

    
    const flagBlocks = chars.forEach(node => {
        var blocks = node.blocks;
        blocks.forEach(block => {
            
        });
        //return node.data.opcode === 'event_whenflagclicked';
    })

}