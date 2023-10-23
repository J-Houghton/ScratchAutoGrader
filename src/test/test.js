/*import assert from 'assert';
import should from 'chai';
import fs from 'fs/promises';
//import fs from 'fs/promises';
//var assert = require('assert');
//var should = require('chai');
//const fs = require('fs');

import orphanSort from '../src/orphans.js';
import unzipSb3 from '../src/sb3Unzipp.js';
import parse from '../src/parser.js';
import count from '../src/count.js';
//const orphanSort = require('../orphans.js');
//const unzipSb3 = require('../sb3Unzipp.js');
//const parse = require('../parser.js');
//const count = require('../count.js');

//import fs from 'fs/promises';
*/
describe('Array Baseline', function () {
  describe('#baseline()', function () {
    it('Should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Orphan result', function () {
  describe('#orphansFile()', function () {
    var comparison = [[
      {
        opcode: 'looks_say',
        next: null,
        parent: null,
        inputs: { MESSAGE: [Array] },
        fields: {}
      }
    ], [
      {
        opcode: 'event_whenflagclicked',
        next: null,
        parent: null,
        inputs: {},
        fields: {}
      },
      {
        opcode: 'event_whenkeypressed',
        next: null,
        parent: null,
        inputs: {},
        fields: { KEY_OPTION: [Array] }
      },
      {
        opcode: 'event_whenstageclicked',
        next: null,
        parent: null,
        inputs: {},
        fields: {}
      },
      {
        opcode: 'event_whenbackdropswitchesto',
        next: null,
        parent: null,
        inputs: {},
        fields: { BACKDROP: [Array] }
      },
      {
        opcode: 'event_whengreaterthan',
        next: null,
        parent: null,
        inputs: { VALUE: [Array] },
        fields: { WHENGREATERTHANMENU: [Array] }
      },
      {
        opcode: 'event_whenbroadcastreceived',
        next: null,
        parent: null,
        inputs: {},
        fields: { BROADCAST_OPTION: [Array] }
      }
    ]]
    it('Should create an output file with expected contents', function () {
      var result = orphanSort('/test/testFiles/output_ast.json');
      assert.deepEqual(result, comparison);
    });
  });
});

describe('Unzipsb3 result', function () {
  describe('#unzippedsb3File()', function () {
    it('Should find the project file when unzipped', function () {
      unzipSb3('sb3Files/3-hello1.sb3');
      var filepath = './unzippedSb3/project.json'
      let fileExists = fs.existsSync(filepath); 
      assert.equal(fileExists, true);
    });
  });
});

describe('Parser result', function () {
  describe('#unzippedsb3File()', function () {
    it('Should find the project file when parsed', function () {
      parse('./unzippedSb3/project.json').catch(error => {
        console.error("An error occurred for parse:", error);
      });
      var filepath = 'output.json'
      let fileExists = fs.existsSync(filepath); 
      assert.equal(fileExists, true);
    });
  });
});

describe('Count result', function () {
  describe('#unzippedsb3File()', function () {
    it('Should return correct block type count', function () {
      var filePath = '../output.json';
      var data = require(filePath);
      var count1 = count.CountBlockPerType(data, "event");
      console.log(count1);
      assert.equal(count1, 6);
    });
  });
});

describe('Count result', function () {
  describe('#unzippedsb3File()', function () {
    it('Should return correct type of block count', function () {
      var filePath = '../output.json';
      var data = require(filePath);
      var count1 = count.CountDifferentBlockTypes(data);
      console.log(count1);
      assert.equal(2, count1);
    });
  });
});