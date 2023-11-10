#!/usr/bin/env node

export function checkParallelExists(astRootNode){
    const starterBlocks = astRootNode.findAllNodes(node => {
        return node.data.opcode === 'event_whenflagclicked' || node.data.opcode === 'event_whenkeypressed' || node.data.opcode === 'event_whenbackdropswitchesto' ||
        node.data.opcode === 'event_whenstageclicked' || node.data.opcode === 'event_whenbroadcastreceived' || node.data.opcode === 'event_whengreaterthan' || node.data.opcode === 'control_start_as_clone';
    });

    return starterBlocks.length > 0 ? starterBlocks : null;
}

export function checkParallelism(astRootNode){

    const targets = astRootNode.root.children;
    const chars = [];
    //console.log(astRootNode.root.children);
    targets.forEach(target => {
        if(target.data.isStage !== true){
            chars.push(target);
        }
    });
    
    /*
    console.log("Targets: ");
    console.info(targets);
    console.log("Chars: ");
    console.info(chars);*/
    
    const flagBlocks = chars.forEach(node => {
        var blocks = node.children;
        console.log(node);
        console.log("block: ")
        console.info(blocks);
        blocks.forEach(block => {
            
        });
        //return node.data.opcode === 'event_whenflagclicked';
    })

}