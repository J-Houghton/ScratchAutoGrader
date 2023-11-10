#!/usr/bin/env node

import fs from 'fs/promises';
import * as data from './output_ast.json' assert {type : 'json'};
export function orphanSort(filePath)
{
    // Grab the file path from command-line arguments
    //const filePath = process.argv[2]; 

    if (!filePath) {
        console.error("Please provide an ast tree or file path as an argument.");
        process.exit(1);
    }
    //const data = require('./' + filePath);
    //var aggg = './' + filePath;
    //import data from aggg;
    //const data = astRootNode;
    //import data from './output_ast.json' assert {type = JSON};

    var targets;

    if(typeof filePath == "object"){
        targets = filePath.root.data.targets;
    }
    else{
        targets = data.default.data.targets;
    }

    const orphans = [];
    const nonOrphans = [];
    const unDecided = [];

    //const targets = root.default.data.targets;
    //console.log(targets[0].blocks);

    for (let i = 0; i < targets.length; i++) {
        var blocks = targets[i].blocks;
        var unDecidedSub = [];
        var blockKeys = Object.keys(blocks);

        for (let i = 0; i < blockKeys.length; i++) {
            var name = blockKeys[i];
            var opcode = blocks[name]['opcode'];
            var topLevel = blocks[name]['topLevel'];
            var parent = blocks[name]['parent'];
            //if(toplevel == true)
            if(parent == null){
                if(opcode === 'event_whenflagclicked' || opcode === 'event_whenkeypressed' || opcode === 'event_whenstageclicked' || opcode === 'control_start_as_clone'
                || opcode === 'event_whenbackdropswitchesto' || opcode === 'event_whengreaterthan' || opcode === 'event_whenbroadcastreceived'){
                    //console.log(name + " is nonorphan!");
                    nonOrphans.push(blocks[name]);
                }
                else{
                    //console.log(name + " is orphaned!")
                    orphans.push(blocks[name]);
                }
            }
            else{ 
                if(!unDecided.includes(name)){
                    unDecidedSub.push(blocks[name]); 
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
            var blockName = unDecidedSub[i];
            console.log(blockName);
            //console.log(blocks[blockName]);

            if(blockName.parent == null){
                console.log("Null parent error");
            }
            else if(orphans.includes(blockName.parent)){
                //console.log(blocks[blockName] + " orphan descendant");
                orphans.push(blockName);
            }
            else if(nonOrphans.includes(blockName.parent)){
                //console.log(blocks[blockName] + " nonorphan descendant");
                nonOrphans.push(blockName);
            }
            else{console.log("MYSTERY"); console.info(blockName);}
        }


    }



    console.log("nonorphans: ");
    console.info(JSON.stringify(nonOrphans));
    console.log("orphans: ");
    console.info(JSON.stringify(orphans));
    var result = [orphans, nonOrphans];
    return result;
}