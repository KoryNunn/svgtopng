var svgToPng = require('../'),
    path = require('path');


svgToPng(
    path.join(__dirname, './node.svg'),
    path.join(__dirname, './results/node.png'),
    function(error){
        console.log(error || 'done');
    }
);


svgToPng(
    path.join(__dirname, './node.svg'),
    path.join(__dirname, './results/node500.png'),
    {
        width: 500,
        height: 500
    },
    function(error){
        console.log(error || 'done');
    }
);