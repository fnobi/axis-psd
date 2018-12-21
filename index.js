const PSD = require('psd');
const _ = require('lodash');
const optimist = require('optimist');

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
    const argv = optimist.options('format', {
        alias: 'f',
        default: 'json',
        describe: 'export format'
    }).options('help', {
        alias: 'h',
        describe: 'show this help'
    }).options('indent', {
        default: 4,
        describe: 'file indent length'
    }).options('ratio', {
        default: 1,
        describe: 'image size ratio'
    }).options('image-dir', {
        describe: 'image location (prefix)'
    }).options('base-selector', {
        default: '.layer',
        describe: 'selector name for layer dom'
    }).options('name-attr', {
        default: 'data-layer',
        describe: 'attribute for image basename'
    }).options('sass-image-function', {
        describe: 'function name for expand image path'
    }).argv;

    if (argv.help) {
        optimist.showHelp();
        process.exit();
    }

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
        // TODO: groupのなかにmask付きレイヤーが居たりした場合、マスクを考慮したサイズで出力されないという既知のバグ
        const params = Object.assign({}, layer, layer.mask);
        array.push({
            name: params.name,
            width: params.width,
            height: params.height,
            top: params.top,
            left: params.left,
            right: params.right,
            bottom: params.bottom
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
