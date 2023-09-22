var assert = require("assert");
var coordAt = require("../geohash").coordAt;
var emojiAt = require("../geohash").emojiAt;
var orderFrom = require("../geohash").orderFrom;
var coordFromHash = require("../geohash").coordFromHash;
require('string.fromcodepoint');

function assertFloatEquals(expected, actual, within) {
  within = within || 0.0001;
  assert.equal(true, Math.abs(expected - actual) < within, "expected " + expected + " (+-" + within + ") " + "but got " + actual);
}

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

describe("reversibility", function() {
  it("can reverse order and emoji", function() {
    assert.equal(0, orderFrom(emojiAt(0)));
    assert.equal(633, orderFrom(emojiAt(633)));
    assert.equal(634, orderFrom(emojiAt(634)));
  });

  it("can reverse general coordinates and emoji", function() {
    var result = coordFromHash(coordAt(-45.5, -10.3, 5));
    assertFloatEquals(-45.5, result[0], 0.1);
    assertFloatEquals(-10.3, result[1], 0.1);
    assert.equal(5, result[2]);
  });

  it("can reverse coordinates near equator/prime meridian emoji", function() {
    var result = coordFromHash(coordAt(0, 0, 3));
    assertFloatEquals(0, result[0], 0.1);
    assertFloatEquals(0, result[1], 0.1);
    assert.equal(3, result[2]);
  });
});

