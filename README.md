# geohash-emoji

Implementing <a href="https://github.com/louh/what3emojis">Lou Huang's What3Emojis</a>
coordinates with a geohash, calculated using NodeJS

These are not official three emoji coordinates yet!

## Implementation

Currently dividing the earth into 30x30 grid squares at each zoom level,
up to three emojis. There are 900^3 possible combinations of three emojis,
so the resulting grid is about one square meter.

Origin is at 90 S, 180 W (the South Pacific)

The 900 emoji are the 766 Miscellaneous Symbols and Pictographs of Unicode 8,
followed by 80 emoticons, then the first 54 Transport and Map Symbols. As
the spec gets defined, some emoji (such as Pile of Poo and Love Hotel) may
be substituted for other Transport and Map Symbol characters.

## Install 

```bash
npm install
```

If you use the browser, also include a
<a href="https://github.com/mathiasbynens/String.fromCodePoint">String.fromCodePoint polyfill</a>
for older browsers:

## Run

Find your latitude and longitude. If I am at 40.1 degrees North, 93.7 degrees
West, then I can run this on the command line:

```bash
node geohash.js 19.6968708 96.1249349
> 🔳🏰💭
```

In NodeJS:

```javascript
var coordAt = require("geohash-emoji").coordAt;
var emojiAt = require("geohash-emoji").emojiAt;
```

In browser JavaScript I can just call

```javascript
coordAt(40.1, -93.7);
```

## Test

Tests both emoji-finding and coordinate system:

```bash
npm test
```

## License

WTFPL because WTF
