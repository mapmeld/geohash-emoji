# geohash-emoji

Implementing Lou Huang's What3Emojis coordinates with a geohash, calculated
using NodeJS

## Implementation

Currently dividing the earth into 30x30 grid squares at each zoom level,
up to three emojis. There are 900^3 possible combinations of three emojis,
so the resulting grid is about one square meter.

Origin is at 90 S, 180 W (the South Pacific)

The 900 emoji are the 766 Miscellaneous Symbols and Pictographs of Unicode 8,
followed by 80 emoticons, then the first 54 Transport and Map Symbols. As
the spec gets defined, some emoji (such as Pile of Poo and Love Hotel) may
be substituted for other Transport and Map Symbol characters.

## Run

Find your latitude and longitude. If I am at 40.1 degrees North, 93.7 degrees
West, then I give this command:

```bash
node geohash.js 40.1 -93.7
```

## License

WTFPL because WTF
