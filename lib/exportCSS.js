const _ = require('lodash');

const CONFIG = require('../CONFIG');

module.exports = function (layers, opts = {}) {
    const imageDir = opts.imageDir || '';
    const sassImageFunction = opts.sassImageFunction || 'url';

    const BASE_SELECTOR = '&';
    const NAME_ATTR = 'data-layer';
    
    const indent = new Array(opts.indent + 1).join(' ');
    return _(layers).map((layer) => {
        const image = layer.name;
        const name = image.replace(CONFIG.IMAGE_EXT, '');
        const props = [
            [ 'left', `${layer.left}px` ],
            [ 'top', `${layer.top}px` ],
            [ 'width', `${layer.width}px` ],
            [ 'height', `${layer.height}px` ],
            [ 'background-image', `${sassImageFunction}("${imageDir}${image}")` ]
        ];
        return [
            `${BASE_SELECTOR}[${NAME_ATTR}="${name}"] {`,
            _.map(props, (prop) => {
                return `${indent}${prop[0]}: ${prop[1]};`;
            }).join('\n'),
            `}`
        ].join('\n');
    }).value().join('\n');
};





