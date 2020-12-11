const PSD = require('psd');
const _ = require('lodash');

const exportCSS = require('./lib/exportCSS');
const exportPug = require('./lib/exportPug');
const CONFIG = require('./CONFIG');

async function axisPsd (opts) {
    const psd = await PSD.open(opts.filePath);
    const tree = psd.tree().export();
    const layers = filterLayers(tree);
    return createOutput(layers, opts);
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
        return {
            type: 'css',
            css: exportCSS(layers, opts)
        };
    case 'pug':
        return {
            type: 'pug',
            pug: exportPug(layers, opts)
        };
    default:
        return {
            type: 'layers',
            layers
        };
    }
}

module.exports = axisPsd;
