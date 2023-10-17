#!/usr/bin/env node

const { file } = require("jszip");

import fs from 'fs/promises';

// Grab the file path from command-line arguments
const filePath = process.argv[2]; 

if (!filePath) {
    console.error("Please provide a file path as an argument.");
    process.exit(1);
}
const data = require('./' + filePath);

const orphans = [];
const nonOrphans = [];
const unDecided = [];

const targets = data.targets;
for (let i = 0; i < targets.length; i++) {
    var blocks = targets[i].blocks;
    var unDecidedSub = [];
    var blockKeys = Object.keys(blocks);

    for (let i = 0; i < blockKeys.length; i++) {
        var name = blockKeys[i];
        var opcode = blocks[name]['opcode'];
        var topLevel = blocks[name]['topLevel'];

        if(topLevel == true){
            if(opcode == 'event_whenflagclicked' || opcode == 'event_whenkeypressed' || opcode == 'event_whenstageclicked' 
            || opcode == 'event_whenbackdropswitchesto' || opcode == 'event_whengreaterthan' || opcode == 'event_whenbroadcastreceived'){
                //console.log(name + " is nonorphan!");
                nonOrphans.push(name);
            }
            else{
                //console.log(name + " is orphaned!")
                orphans.push(name);
            }
        }
        else{ 
            if(!unDecided.includes(name)){
                unDecidedSub.push(name); 
            }
        }
    }
    unDecided.push(unDecidedSub);
}
//console.info(unDecided);

for (let i = 0; i < targets.length; i++) {
    var blocks = targets[i].blocks;
    var blockKeys = Object.keys(blocks);
    var unDecidedSub = unDecided[i];
    //console.log(unDecidedSub.length);
    for(let i = 0; i < unDecidedSub.length; i++){
        blockName = unDecidedSub[i];
        //console.log(blockName);
        //console.log(blocks[blockName]);
        if(blocks[blockName].parent == null){
            console.log("Null parent error");
        }
        else if(orphans.includes(blocks[blockName].parent)){
            //console.log(blocks[blockName] + " orphan descendant");
            orphans.push(blockName);
        }
        else if(nonOrphans.includes(blocks[blockName].parent)){
            //console.log(blocks[blockName] + " nonorphan descendant");
            nonOrphans.push(blockName);
        }
        else{console.log("HUH? HUH? HUH?")}
    }


}



console.log("nonorphans: ");
console.info(nonOrphans);
console.log("orphans: ");
console.info(orphans);

