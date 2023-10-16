var assert = require('assert');

const method = require('../orphans.js');
const orphanSort = require('../orphans.js');
const count = require('../count.js');

describe('Array Baseline', function () {
  describe('#baseline()', function () {
    it('Should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
