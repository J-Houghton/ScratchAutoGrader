var assert = require('assert');
//var should = require('chai');

const method = require('../orphans.js');
const orphanSort = require('../orphans.js');
const countMethod = require('../count.js');

describe('Array Baseline', function () {
  describe('#baseline()', function () {
    it('Should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Orphan result', function () {
  describe('#orphansFile()', function () {
    var comparison = [[], ['78A9q__=!j!06~s.DEur', '~jw3DbpuL|d@iR@0SAf8']]
    it('Should return -1 when the value is not present', function () {
      var result = orphanSort('output.json');
      assert.deepEqual(result, comparison);
    });
  });
});

describe('Count Test', function() {
  describe('#outputFile()', function() {
    var file = '../output.json';
    var count = countMethod.CountBlockPerType(file, "events");
    assert.equal(count, 1);
  });
});