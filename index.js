const PSD = require('psd');
const _ = require('lodash');

const exportJSON = require('./lib/exportJSON');
const exportCSS = require('./lib/exportCSS');
const exportPug = require('./lib/exportPug');
const CONFIG = require('./CONFIG');

function axisPsd (opts) {
    return PSD.open(opts.filePath).then((psd) => {
        const tree = psd.tree().export();
        const layers = filterLayers(tree);

        const output = createOutput(layers, opts);
        console.log(output);
    });
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

module.exports = axisPsd;
