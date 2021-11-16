const chai = require('chai');
const assert = chai.assert;

const wordSearch = require('../wordsearch.js')

const letters = [
  ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
  ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
  ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
  ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
  ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
  ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
  ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
  ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
  ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
];


describe("#wordSearch()", function() {
  it("should return false if the word is not present", function() {
    const result = wordSearch(letters, 'FRANK')

    assert.isFalse(result);
  });

  it("should return true if the word is present horizontally", function() {
    const result = wordSearch(letters, 'SEINFELD')

    assert.isTrue(result);
  });

  it("should return true if the word is present vertically", function() {
    const result = wordSearch(letters, 'BUOE')

    assert.isTrue(result);
  });

  it("should return false if the input array is empty", function() {
    const result = wordSearch([], 'BUOE');

    assert.isFalse(result);
  });

  it("should return false if the input word is empty", function() {
    const result = wordSearch(letters, '');

    assert.isFalse(result);
  });

  it("should return true if the word is present backwards horizontally", function() {
    const result = wordSearch(letters, 'DLEFNIES')

    assert.isTrue(result);
  });

  it("should return true if the word is present backwards vertically", function() {
    const result = wordSearch(letters, 'EOUB')

    assert.isTrue(result);
  });

  it("should return true if the word is present diagonally", function() {
    const result = wordSearch(letters, 'EDTEYVAD')

    assert.isTrue(result);
  });

});
