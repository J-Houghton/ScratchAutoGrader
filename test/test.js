var assert = require('assert');
var should = require('chai');
const fs = require('fs');

const orphanSort = require('../orphans.js');
const unzipSb3 = require('../sb3Unzipp.js');
const parse = require('../parser.js');
const count = require('../count.js');

describe('Array Baseline', function () {
  describe('#baseline()', function () {
    it('Should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Orphan result', function () {
  describe('#orphansFile()', function () {
    var comparison = [['~jw3DbpuL|d@iR@0SAf8'], [
      'Y+lihnBIOz7fD37Q=ZnK',
      'B*gGxlI~MEZ9-Ju49%+x',
      ']lV3}z3LwM/O1|B%v-6+',
      'q*b=xBFg.TxzxJrLUW@S',
      'Xk:b`skdY6nogJv.`JSG',
      '$R].S$@Q4Q=ZZsnN/w$z'
    ]]
    it('Should create an output file with expected contents', function () {
      var result = orphanSort('/test/testFiles/output.json');
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