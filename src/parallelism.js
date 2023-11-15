#!/usr/bin/env node
//Checks if more than one top-level starting block exists in a program. Broad check of paralellism
export function checkParallelExists(astRootNode){
    //Finds all qualified blocks
    const starterBlocks = astRootNode.findAllNodes(node => {
        return node.data.opcode === 'event_whenflagclicked' || node.data.opcode === 'event_whenkeypressed' || node.data.opcode === 'event_whenbackdropswitchesto' ||
        node.data.opcode === 'event_whenspriteclicked' || node.data.opcode === 'event_whenbroadcastreceived' || node.data.opcode === 'event_whengreaterthan' || node.data.opcode === 'control_start_as_clone';
    });

    //Checks for block totals and returns
    return starterBlocks.length > 1 ? starterBlocks : null;
}

//Checks for coding in any one characters which runs two code blocks from the green flag (Flag para) or 
// two from the key event block, with the same key (Complex para)
export function checkParallelism(astRootNode){

    //Identifies and collects only Character targets
    const targets = astRootNode.root.children;
    const chars = [];
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
    
    //Iterates through both checks for every character
    var result;
    chars.forEach(node => {
        var flag = [];
        var key = [];
        var keycount = 0;
        var blocks = node.children;
        //Iterates through every block for qualified examples (Block type and >= 1 child)
        blocks.forEach(block => {
            //console.log(block.data.next)
            if(block.data.opcode === 'event_whenflagclicked' && block.data.next !== null){
                flag.push(block);
            }
            if(block.data.opcode === 'event_whenkeypressed' && block.data.next !== null){
                key.push(block);
            }
        });
        //Iterates through key-press blocks to identify those with the same keys
        for(var i = 0; i < key.length; i++){
            //console.info(key[i].data.fields);
            var key1 = key[i];
            for(var x = i+1; x < key.length; x++){
                if(key1.data.fields.KEY_OPTION[0] === key[x].data.fields.KEY_OPTION[0]){ 
                    keycount++; 
                }
            }
        }
        //console.log('keyc ' + keycount);
        //Returns Complex para with top priority, Flag para with second, and No para by default
        if(keycount > 0){ result = "Complex Parallelism";}
        if(flag.length > 1 && result !== "Complex Parallelism"){ result = 'Flag Parrallelism';}
        if(result !== "Complex Parallelism" && result !== 'Flag Parrallelism'){ result = 'No Parrallelism';}
    })
    
    return result;
}