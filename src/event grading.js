#!/usr/bin/env node
//Checks one or more top-level starting block exists in a program. Broad check of events
export function checkEventExists(astRootNode){
    //Finds all qualified blocks
    const starterBlocks = astRootNode.findAllNodes(node => {
        return node.data.opcode === 'event_whenflagclicked' || node.data.opcode === 'event_whenkeypressed' || node.data.opcode === 'event_whenbackdropswitchesto' || node.data.opcode === 'event_whenspriteclicked' ||
        node.data.opcode === 'event_whenbroadcastreceived' || node.data.opcode === 'event_whengreaterthan' || node.data.opcode === 'control_start_as_clone';
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
    var res = ['No events', 'Incorrect events', 'Basic events', 'Complex events'];
    var blocks = checkEventExists(astRootNode);
    if(blocks === null){ result = 0; return res[result]; }else{ result = 1; }
    
    for(var x = 0; x < blocks.length; x++){
        var block = blocks[x]
        if(block.data.opcode === 'event_whenkeypressed' || block.data.opcode === 'event_whenbackdropswitchesto' || block.data.opcode === 'event_whenspriteclicked' ||
        block.data.opcode === 'event_whenbroadcastreceived' || block.data.opcode === 'event_whengreaterthan' || block.data.opcode === 'control_start_as_clone'){
            if(block.data.next !== null){
                if(result < 2){result = 2;}
            }
        }
        if(block.data.opcode === 'event_whenflagclicked'){
            console.log('EVENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
            
            if(block.children.length >= 1){
                var y = 0;
                for(var i = block.children[y]; i !== undefined; i = i.children[y]){
                    if(i.children.length >= 1){
                        if(i.children[0].data.opcode.endsWith("menu")){
                            y = 1;
                        }
                    }
                    else{y = 0;}
                    console.log('i:');
                    console.info(i);
                }
            }
            
        }
        
    
    
    }

    return result;
}