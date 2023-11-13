#!/usr/bin/env node

export function checkParallelExists(astRootNode){
    const starterBlocks = astRootNode.findAllNodes(node => {
        return node.data.opcode === 'event_whenflagclicked' || node.data.opcode === 'event_whenkeypressed' || node.data.opcode === 'event_whenbackdropswitchesto' ||
        node.data.opcode === 'event_whenspriteclicked' || node.data.opcode === 'event_whenbroadcastreceived' || node.data.opcode === 'event_whengreaterthan' || node.data.opcode === 'control_start_as_clone';
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
    const result = '';

    chars.forEach(node => {
        var flag = [];
        var stage = [];
        var key = [];
        var keycount = 0;
        var backSwitch = [];
        var broadcast = [];
        var greater = [];
        var clone = [];
        var blocks = node.children;
        /*console.log(node);
        console.log("block: ")
        console.info(blocks);*/
        blocks.forEach(block => {
            if(block.data.opcode === 'event_whenflagclicked'){
                flag.push(block);
            }
            if(block.data.opcode === 'event_whenkeypressed'){
                key.push(block);
            }
            if(block.data.opcode === 'event_whenbroadcastreceived'){
                broadcast.push(block);
            }
        });
        for(var i = 0; i < key.length; i++){
            //console.info(key[i].data.fields);
            var key1 = key[i];
            for(var x = i+1; x < key.length; x++){
                /*
                console.log('i ' + i);
                console.log('x ' + x);
                console.log(key1.data.fields.KEY_OPTION[0]);
                console.log(key[x].data.fields.KEY_OPTION[0]);
                */
                if(key1.data.fields.KEY_OPTION[0] === key[x].data.fields.KEY_OPTION[0]){ 
                    keycount++; 
                }
            }
        }
        console.log('keyc ' + keycount);
        if(keycount > 0){ result = 'Complex Parallelism'; return result; }
        if(flag.length > 1){
            return 'Flag Parrallelism';
        }
    })
    

}