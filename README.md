# svgtopng 

Converts SVGs to PNGs

Inspired by (https://github.com/filamentgroup/svg-to-png)

## usage

    npm install svgtopng

```javascript
var svgToPng = require('svg-to-png');

svgToPng('path to an .svg', 'path for the output .png'[, options], callback);

```

## example

```javascript
var svgToPng = require('../'),
    path = require('path');

svgToPng(
    path.join(__dirname, './node.svg'),
    path.join(__dirname, './results/node500.png'),
    {
        width: 500,
        height: 500
    },
    function(error){
        // if no error, the .png will be on disk
    }
);
```

## options

options are optional.

### height

Resize the image to specified height

### width

Resize the image to specified width

### defaultWidth

If the svg does not specify a width, this will be used

### defaultHeight

If the svg does not specify a height, this will be used