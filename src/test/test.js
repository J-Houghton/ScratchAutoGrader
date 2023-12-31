import assert from 'assert';
import should from 'chai';
import fs from 'fs/promises';

import { orphanSort } from '../orphans.js';
import { unzipSb3 } from '../sb3Unzipp.js';
import { Parser } from '../parser.js';
import { countBlockTypes } from '../count.js';
import { countBlocksByOpcode } from '../count.js';

var filepath = await unzipSb3('sb3Files/3-hello1.sb3');
const parser = new Parser(); 
const astRootNode = await parser.parse(filepath);

describe('Array Baseline', function () {
  describe('#baseline()', function () {
    it('Should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// Compares orphans output to given output from using 3-hello1.sb3
describe('Orphan result', function () {
  describe('#orphansFile()', function () {
    var comparison = [[{"opcode":"looks_say","next":null,"parent":null,"inputs":{"MESSAGE":[1,[10,"Hello!"]]},"fields":{}}],
    [{"opcode":"event_whenflagclicked","next":null,"parent":null,"inputs":{},"fields":{}},
    {"opcode":"event_whenkeypressed","next":null,"parent":null,"inputs":{},"fields":{"KEY_OPTION":["space",null]}},
    {"opcode":"event_whenstageclicked","next":null,"parent":null,"inputs":{},"fields":{}},
    {"opcode":"event_whenbackdropswitchesto","next":null,"parent":null,"inputs":{},"fields":{"BACKDROP":["backdrop1",null]}},
    {"opcode":"event_whengreaterthan","next":null,"parent":null,"inputs":{"VALUE":[1,[4,"10"]]},"fields":{"WHENGREATERTHANMENU":["LOUDNESS",null]}},
    {"opcode":"event_whenbroadcastreceived","next":null,"parent":null,"inputs":{},"fields":{"BROADCAST_OPTION":["message1","~74LMZ1TPu$[YfyU2p^M"]}}]]
    it('Should create an output file with expected contents', function () {
      var result = orphanSort('/src/test/testFiles/output_ast.json');
      //console.info(result);
      //console.info(JSON.stringify(result));
      assert.deepEqual(result, comparison);
    });
  });
});

describe('Unzipsb3 result', async function () {
  describe('#unzippedsb3File()', async function () {
    it('Should find the project file when unzipped', async function () {
      var filepath = await unzipSb3('sb3Files/3-hello1.sb3');
      
      let file = await fs.open(filepath); 
      console.log(file);
      assert(file);
      
    });
  });
});

describe('Parser result', async function () {
  describe('#unzippedsb3File()', async function () {
    it('Should verify the ast object when parsed', async function () {
      console.log(astRootNode);
      assert(astRootNode);
    });
  });
});

describe('Count result', async function () {
  describe('#unzippedsb3File()', async function () {
    it('Should return correct block type count', async function () {
      
      var counts = countBlockTypes(astRootNode);
      console.log(counts);
      for(var i = 0; i < counts.length; i++){
        assert.equal(count[i], 1);
      }
    });
  });
});

describe('Count result', async function () {
  describe('#unzippedsb3File()', async function () {
    it('Should return correct type of block count', async function () {
      var counts = countBlockTypes(astRootNode);
      var number = countBlocksByOpcode(counts, "event");
      assert.equal(6, number);
    });
  });
});