const PSD = require('psd');
const _ = require('lodash');

const exportJSON = require('./lib/exportJSON');
const exportCSS = require('./lib/exportCSS');
const CONFIG = require('./CONFIG');

const argv = require('optimist')
          .string('f')
          .alias('f', 'format')
          .describe('f', 'export format')
          .argv;

const filePath = argv._.shift();
const format = argv.format;

if (!filePath) {
    throw new Error('no file path.');
}

function filterLayers (layer) {
    const array = [];
    if (layer.name && CONFIG.IMAGE_EXT.test(layer.name)) {
        array.push({
            name: layer.name,
            width: layer.width,
            height: layer.height,
            top: layer.top,
            left: layer.left,
            right: layer.right,
            bottom: layer.bottom
        });
    }
    if (layer.children) {
        _.each(layer.children, (child) => {
            array.push(filterLayers(child));
        });
    }
    return _.flatten(array);
}

function createOutput (layers) {
    switch (format) {
    case 'css':
        return exportCSS(layers);
    default:
        return exportJSON(layers);
    }
}

PSD.open(filePath).then((psd) => {
    const tree = psd.tree().export();
    const layers = filterLayers(tree);

    const output = createOutput(layers);
    console.log(output);
});

