const _ = require('lodash');

const CONFIG = require('../CONFIG');

module.exports = function (layers, opts = {}) {
    const imageDir = opts.imageDir || '';
    const sassImageFunction = opts.sassImageFunction || 'url';
    const ratio = opts.ratio || 1;
    const baseSelector = opts.baseSelector;
    const nameAttr = opts.nameAttr;

    const indent = new Array(opts.indent + 1).join(' ');
    return _(layers).reverse().map((layer) => {
        const image = layer.name;
        const name = image.replace(CONFIG.IMAGE_EXT, '');
        const props = [
            [ 'left', `${layer.left * ratio}px` ],
            [ 'top', `${layer.top * ratio}px` ],
            [ 'width', `${layer.width * ratio}px` ],
            [ 'height', `${layer.height * ratio}px` ],
            [ 'background-image', `${sassImageFunction}("${imageDir}${image}")` ]
        ];
        return [
            `${baseSelector}[${nameAttr}="${name}"] {`,
            _.map(props, (prop) => {
                return `${indent}${prop[0]}: ${prop[1]};`;
            }).join('\n'),
            `}`
        ].join('\n');
    }).value().join('\n');
};





