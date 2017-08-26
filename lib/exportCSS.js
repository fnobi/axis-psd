const _ = require('lodash');

const CONFIG = require('../CONFIG');

const INDENT = 4;
const IMAGE_DIR = '';
const IMAGE_FUNCTION = 'image-url';
const BASE_SELECTOR = '&';
const NAME_ATTR = 'data-layer';

module.exports = function (layers) {
    const indent = new Array(INDENT + 1).join(' ');
    return _(layers).map((layer) => {
        const image = layer.name;
        const name = image.replace(CONFIG.IMAGE_EXT, '');
        const props = [
            [ 'left', `${layer.left}px` ],
            [ 'top', `${layer.top}px` ],
            [ 'width', `${layer.width}px` ],
            [ 'height', `${layer.height}px` ],
            [ 'background-image', `${IMAGE_FUNCTION}("${IMAGE_DIR}${image}")` ]
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





