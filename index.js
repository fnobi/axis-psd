const PSD = require('psd');
const _ = require('lodash');

const exportJSON = require('./lib/exportJSON');
const exportCSS = require('./lib/exportCSS');
const exportPug = require('./lib/exportPug');
const CONFIG = require('./CONFIG');

const FORMAT_LIST = [ 'css', 'pug', 'json' ];

function init () {
    const opts = parseOptions();
    
    PSD.open(opts.filePath).then((psd) => {
        const tree = psd.tree().export();
        const layers = filterLayers(tree);

        const output = createOutput(layers, opts);
        console.log(output);
    });
}

function parseOptions () {
    const argv = require('optimist')
              .string('f')
              .alias('f', 'format')
              .default('format', 'json')
              .describe('f', 'export format')

              .string('indent')
              .default('indent', 4)
              .describe('indent', 'file indent length')
    
              .string('ratio')
              .default('ratio', 1)
              .describe('ratio', 'image size ratio')

              .string('image-dir')
              .describe('image-dir', 'image location (prefix)')
    
              .string('base-selector')
              .default('base-selector', '.layer')
              .describe('base-selector', 'selector name for layer dom')
    
              .string('name-attr')
              .default('name-attr', 'data-layer')
              .describe('name-attr', 'attribute for image basename')
    
              .string('sass-image-function')
              .describe('sass-image-function', 'function name for expand image path')

              .argv;

    const filePath = argv._.shift();
    if (!filePath) {
        throw new Error('no file path.');
    }

    const format = argv.format;
    if (!_.includes(FORMAT_LIST, format)) {
        throw new Error(`"${format}" is invalid format.`);
    }

    if (isNaN(argv.indent)) {
        throw new Error(`indent "${argv.indent}" is NaN.`);
    }
    const indent = Number(argv.indent);

    if (isNaN(argv.ratio)) {
        throw new Error(`ratio "${argv.ratio}" is NaN.`);
    }
    const ratio = Number(argv.ratio);

    return {
        filePath, format, indent, ratio,
        imageDir: argv['image-dir'],
        baseSelector: argv['base-selector'],
        nameAttr: argv['name-attr'],
        sassImageFunction: argv['sass-image-function']
    };
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

function createOutput (layers, opts) {
    switch (opts.format) {
    case 'css':
        return exportCSS(layers, opts);
    case 'pug':
        return exportPug(layers, opts);
    default:
        return exportJSON(layers);
    }
}

init();
