const _ = require('lodash');

const CONFIG = require('../CONFIG');

module.exports = function (layers, opts = {}) {
    const BASE_SELECTOR = '.layer';
    const NAME_ATTR = 'data-layer';
    
    return _(layers).reverse().map((layer) => {
        const image = layer.name;
        const name = image.replace(CONFIG.IMAGE_EXT, '');
        return `${BASE_SELECTOR}(${NAME_ATTR}="${name}")`;
    }).value().join('\n');
};
