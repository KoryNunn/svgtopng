var path = require('path'),
    phantomPath = require('phantomjs').path,
    svgToPngPath = path.join(__dirname, 'svgToPng.js'),
    execFile = require('child_process').execFile;

module.exports = function(inputPath, outputPath, options, callback){
    if(typeof inputPath !== 'string'){
        throw new Error('Input folder must be defined and a String');
    }

    if(typeof outputPath !== 'string'){
        throw new Error('Output folder must be defined and a String');
    }

    if(typeof options === 'function'){
        callback = options;
        options = null;
    }

    options || (options = {});
    options.defaultWidth || (options.defaultWidth = 400);
    options.defaultHeight || (options.defaultHeight = 300);
    options.inputPath = inputPath;
    options.outputPath = outputPath;

    execFile(phantomPath,
        [
            svgToPngPath,
            JSON.stringify(options)
        ],
        function(error){
            if(error){
                return callback(error);
            }
            callback();
        }
    );
};
