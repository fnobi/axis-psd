const _ = require('lodash');
const yargs = require('yargs');
const axisPsd = require('../index')

const FORMAT_LIST = [ 'css', 'pug', 'json' ];

async function init () {
    const opts = await parseOptions();
    const res = await axisPsd(opts);
    switch (res.type) {
    case 'css':
        console.log(res.css);
        return;
    case 'pug':
        console.log(res.pug);
        return;
    default:
        console.log(JSON.stringify(res.layers));
        return;
    }
}

async function parseOptions () {
    const argv = await yargs.options('format', {
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

init();
