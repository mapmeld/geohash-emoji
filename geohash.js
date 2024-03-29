if (!String.fromCodePoint) {
  require('string.fromcodepoint');
}

function emojiSize() {
  // height, width
  return {
    height: 30,
    width: 30
  }
}

function emojiBlocks() {
  return {
    "Miscellaneous Symbols and Pictographs": {
      count: 766,
      start: 0x1F300,
      missing: [0x1F57A, 0x1F5A4]
    },
    "Emoticons": {
      count: 80,
      start: 0x1F600,
      missing: []
    },
    "Transport and Map Symbols": {
      count: 98,
      start: 0x1F680,
      missing: [0x1F6D1,0x1F6D2,0x1F6D3,0x1F6D4,0x1F6D5,0x1F6D6,0x1F6D7,0x1F6D8,0x1F6D9,0x1F6DA,0x1F6DB,0x1F6DC,0x1F6DD,0x1F6DE,0x1F6DF,0x1F6ED,0x1F6EE,0x1F6EF,0x1F6F4,0x1F6F5,0x1F6F6,0x1F6F7,0x1F6F8,0x1F6F9,0x1F6FA,0x1F6FB,0x1F6FC,0x1F6FD,0x1F6FE,0x1F6FF]
    },
    "Supplemental Symbols and Pictographs": {
      count: 15,
      start: 0x1F910,
      missing: [
        0x1F919,0x1F91A,0x1F91B,0x1F91C,0x1F91D,0x1F91E,0x1F91F,0x1F920,0x1F921,0x1F922,0x1F923,0x1F924,0x1F925,0x1F926,0x1F927,0x1F928,0x1F929,0x1F92A,0x1F92B,0x1F92C,0x1F92D,0x1F92E,0x1F92F,0x1F930,0x1F931,0x1F932,0x1F933,0x1F934,0x1F935,0x1F936,0x1F937,0x1F938,0x1F939,0x1F93A,0x1F93B,0x1F93C,0x1F93D,0x1F93E,0x1F93F,0x1F940,0x1F941,0x1F942,0x1F943,0x1F944,0x1F945,0x1F946,0x1F947,0x1F948,0x1F949,0x1F94A,0x1F94B,0x1F94C,0x1F94D,0x1F94E,0x1F94F,0x1F950,0x1F951,0x1F952,0x1F953,0x1F954,0x1F955,0x1F956,0x1F957,0x1F958,0x1F959,0x1F95A,0x1F95B,0x1F95C,0x1F95D,0x1F95E,0x1F95F,0x1F960,0x1F961,0x1F962,0x1F963,0x1F964,0x1F965,0x1F966,0x1F967,0x1F968,0x1F969,0x1F96A,0x1F96B,0x1F96C,0x1F96D,0x1F96E,0x1F96F,0x1F970,0x1F971,0x1F972,0x1F973,0x1F974,0x1F975,0x1F976,0x1F977,0x1F978,0x1F979,0x1F97A,0x1F97B,0x1F97C,0x1F97D,0x1F97E,0x1F97F,0x1F985,0x1F986,0x1F987,0x1F988,0x1F989,0x1F98A,0x1F98B,0x1F98C,0x1F98D,0x1F98E,0x1F98F,0x1F990,0x1F991,0x1F992,0x1F993,0x1F994,0x1F995,0x1F996,0x1F997,0x1F998,0x1F999,0x1F99A,0x1F99B,0x1F99C,0x1F99D,0x1F99E,0x1F99F,0x1F9A0,0x1F9A1,0x1F9A2,0x1F9A3,0x1F9A4,0x1F9A5,0x1F9A6,0x1F9A7,0x1F9A8,0x1F9A9,0x1F9AA,0x1F9AB,0x1F9AC,0x1F9AD,0x1F9AE,0x1F9AF,0x1F9B0,0x1F9B1,0x1F9B2,0x1F9B3,0x1F9B4,0x1F9B5,0x1F9B6,0x1F9B7,0x1F9B8,0x1F9B9,0x1F9BA,0x1F9BB,0x1F9BC,0x1F9BD,0x1F9BE,0x1F9BF
      ]
    }
  };
}

function emojiSubstitutes() {
  return {
    // love hotel replaced by walking person
    [String.fromCodePoint(127977)]: String.fromCodePoint(0x1F6B6),
    // pile of poo replaced by no-walking sign
    [String.fromCodePoint(128169)]: String.fromCodePoint(0x1F6B7)
  };
}

function splitEmoji(hash) {
  // Regular expression that matches emojis and other grapheme clusters
  // Alternative is to use [...hash] to split the string into an array of characters, but I dunno compatibility
  var regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[^[\uD800-\uDBFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])]/g;
  return hash.match(regex) || [];
}

// reference emoji
var emojiAt = function (order, block) {
  // emoji blocks, in order, with start, missing blocks, and symbol length
  var eBlocks= emojiBlocks();

  if (!block || !eBlocks[block]) {
    // determine overall Unicode order
    var bs = Object.keys(eBlocks);
    for (var b = 0; b < bs.length; b++) {
      if (order < eBlocks[bs[b]].count) {
        return emojiAt(order, bs[b]);
      } else {
        order -= eBlocks[bs[b]].count;
      }
    }
  } else {
    // get nth valid character within block
    var nth = eBlocks[block].start + order;
    for (var m = 0; m < eBlocks[block].missing.length; m++) {
      if (eBlocks[block].missing[m] <= nth) {
        nth++;
      } else {
        break;
      }
    }
    return String.fromCodePoint(nth);
  }
};

var coordAt = function(lat, lng, precision) {
  var emojiHeight = emojiSize().height;
  var emojiWidth = emojiSize().width;
  var substitutes = emojiSubstitutes();

  precision = precision || 3;
  var hash = "";
  var north = 90.0;
  var south = -90.0;
  var east = 180.0;
  var west = -180.0;

  for (var i = 0; i < precision; i++) {
    var latRatio = ((lat - south) / (north - south));
    var lngRatio = ((lng - west) / (east - west));
    var latRow = Math.floor(latRatio * emojiHeight);
    var lngColumn = Math.floor(lngRatio * emojiWidth);
    // console.log("zoom " + (i+1) + ": at " + (latRow+1) + "th row, " + (lngColumn+1) + "th column");

    // add appropriate emoji to hash
    var newc = emojiAt(emojiWidth * latRow + lngColumn);
    if (substitutes[newc]) {
      newc = substitutes[newc];
    }
    hash += newc;

    // calculate next box of the grid
    var gridHeight = (north - south) / emojiHeight;
    var gridWidth = (east - west) / emojiWidth;
    south += gridHeight * latRow;
    north = south + gridHeight;
    west += gridWidth * lngColumn;
    east = west + gridWidth;
  }
  return hash;
};

function orderFrom(emoji) {
  var codePoint = emoji.codePointAt(0);
  var eBlocks= emojiBlocks();

  for (var block in eBlocks) {
    if (codePoint >= eBlocks[block].start &&
      codePoint < eBlocks[block].start + eBlocks[block].count + eBlocks[block].missing.length) {
      var order = codePoint - eBlocks[block].start;
      for (var i = 0; i < eBlocks[block].missing.length && eBlocks[block].missing[i] <= codePoint; i++) {
        order--;
      }
      return order;
    }
  }
  return null;
}

function coordFromHash(hash) {
  // emoji grid reference
  var emojiHeight = emojiSize().height;
  var emojiWidth = emojiSize().width;
  var substitutes = emojiSubstitutes();

  var hash_array = splitEmoji(hash);

  var precision = hash_array.length;
  var north = 90.0;
  var south = -90.0;
  var east = 180.0;
  var west = -180.0;

  for (var i = 0; i < precision; i++) {
    var emoji = hash_array[i];
    // reverse substitution
    emoji = Object.keys(substitutes).find(key => substitutes[key] === emoji) || emoji;

    var order = orderFrom(emoji);
    var latRow = Math.floor(order / emojiWidth);
    var lngColumn = order % emojiWidth;

    // calculate box of the grid
    var gridHeight = (north - south) / emojiHeight;
    var gridWidth = (east - west) / emojiWidth;

    south = south + gridHeight * latRow;
    north = south + gridHeight;
    west = west + gridWidth * lngColumn;
    east = west + gridWidth;
  }

  // Return the central point of the final box as the estimated coordinate
  var lat = (south + north) / 2;
  var lng = (west + east) / 2;

  return [lat, lng, precision];
}

if (typeof process !== 'undefined' && process.argv) {
  if (process.argv.length === 4) {
    var lat = process.argv[2] * 1;
    var lng = process.argv[3] * 1;
    if (isNaN(lat) || isNaN(lng)) {
      console.log("use syntax: node geohash.js LATITUDE LONGITUDE");
    } else {
      console.log(coordAt(lat, lng));
    }
  } else if (process.argv.length === 3) {
    var hash = process.argv[2];
    var hash_array = splitEmoji(hash);
    if (hash_array.length > 0) {
      result = coordFromHash(hash);
      console.log(result[0] + " " + result[1] + " (precision " + result[2] + ")");
    } else {
      console.log("use syntax: node geohash.js EMOJIS");
    }
  } else {
    console.log("use syntax: node geohash.js LATITUDE LONGITUDE");
    console.log("use syntax: node geohash.js EMOJIS");
  }
}

if (typeof exports !== "undefined") {
  exports.emojiAt = emojiAt;
  exports.coordAt = coordAt;
  exports.orderFrom = orderFrom;
  exports.coordFromHash = coordFromHash;
  exports.splitEmoji = splitEmoji;
}
