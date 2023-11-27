#!/usr/bin/env node
//Checks one or more top-level starting block exists in a program. Broad check of events
export function checkEventExists(astRootNode){
    //Finds all qualified blocks
    const starterBlocks = astRootNode.findAllNodes(node => {
        return node.data.opcode === 'event_whenflagclicked' || node.data.opcode === 'event_whenkeypressed' || node.data.opcode === 'event_whenbackdropswitchesto' ||
        node.data.opcode === 'event_whenspriteclicked' || node.data.opcode === 'event_whenbroadcastreceived' || node.data.opcode === 'event_whengreaterthan' || node.data.opcode === 'control_start_as_clone';
    });

    //Returns
    if(starterBlocks.length >= 1){
        return starterBlocks;
    }
    else{
        return null;
    }
}
//Failure, no code
//Incorrect specials
//Basic correct
//Correct message
//Used Message and the rest
export function checkEvent(astRootNode){
    var result = 0;
    var blocks = checkEventExists(astRootNode);
    if(blocks === null){ result = 'Events: No Code'; return result; }
    if(block.data.next !== null)
    blocks.foreach(block => {
        if(block.data.opcode === 'event_whenkeypressed'){
            if(block.data.next !== null){
                if(result < 2){result = 2;}
            }
            if(result < 1){result = 1;}
        }

        
    
    
    })

    return result;
}