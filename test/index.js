var assert = require("assert");
var coordAt = require("../geohash").coordAt;
var emojiAt = require("../geohash").emojiAt;
require('String.fromCodePoint');

describe("emoji picking", function() {
  it("returns first misc symbol - a cyclone - for 0", function() {
    var ret = emojiAt(0);
    assert.equal(String.fromCodePoint(0x1F300), ret);
  });
  
  it("skips a blank codepoint to return left hand telephone symbol for 0", function() {
    var ret = emojiAt(633);
    assert.equal(String.fromCodePoint(0x1F579), ret);
  
    var ret = emojiAt(634);
    assert.equal(String.fromCodePoint(0x1F57B), ret);

    var ret = emojiAt(635);
    assert.equal(String.fromCodePoint(0x1F57C), ret);
  });
  
  it("no substitute for pile of poo", function() {
    var ret = emojiAt(425);
    assert.equal(String.fromCodePoint(0x1F4A9), ret);
  });
  
  it("returns first emoticon - grinning face - for 766", function() {
    var ret = emojiAt(766);
    assert.equal(String.fromCodePoint(0x1F600), ret);
  });
});

describe("coordinate system", function() {
  it("returns first misc symbol - a cyclone - for -90, -180", function() {
    var ret = coordAt(-89.9, -179.9);
    assert.equal(String.fromCodePoint(0x1F300), ret.substring(0, 2));
  });
  
  it("returns second misc symbol - fog - for the next square to the east", function() {
    var ret = coordAt(-89.9, -165);
    assert.equal(String.fromCodePoint(0x1F301), ret.substring(0, 2));
  });
  
  it("returns 31st misc symbol - sun with face - for the next square to the north", function() {
    var ret = coordAt(-84, -179);
    assert.equal(String.fromCodePoint(0x1F31E), ret.substring(0, 2));
  });
  
  it("substitute for pile of poo", function() {
    var ret = coordAt(-4, -118);
    assert.equal(String.fromCodePoint(0x1F6B7), ret.substring(0, 2));
  });
});