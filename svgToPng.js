var system = require("system"),
    fs = require('fs'),
    options = JSON.parse(phantom.args[0]);

phantom.onError = function(msg) {
    system.stderr.write(msg);
    phantom.exit(1);
};

function render(filePath, options, callback) {
    var imageData = fs.read(filePath) || "",
        svgContainer = window.document.createElement("div");

    svgContainer.innerHTML = imageData;

    var svgElement = svgContainer.querySelector("svg"),
        elementWidth = parseInt(svgElement.getAttribute("width") || options.defaultWidth),
        elementHeight = parseInt(svgElement.getAttribute("height") || options.defaultHeight),
        width = parseInt(options.width || elementWidth),
        height = parseInt(options.height || elementHeight);


    var page = require("webpage").create();
    page.viewportSize = {  
        width: parseFloat(width),
        height: parseFloat(height)
    };

    page.open(filePath, function(status){
        if(status !== "success"){
            return callback(status);
        }

        page.evaluate(function(width, height, elementWidth, elementHeight){
            var svg = document.querySelector("svg");
            svg.setAttribute("width", width + 'px');
            svg.setAttribute("height", height + 'px');
            svg.setAttribute("viewBox", '0 0 ' + elementWidth + ' ' + elementHeight);
        }, width, height, elementWidth, elementHeight);
        page.render(options.outputPath);
        callback();
    });
};

render(options.inputPath, options, function(error){
    if(error){
        throw error;
    }

    phantom.exit();
});

