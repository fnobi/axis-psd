const _ = require('lodash');

const CONFIG = require('../CONFIG');

module.exports = function (layers, opts = {}) {
    const baseSelector = opts.baseSelector;
    const nameAttr = opts.nameAttr;
    
    return _(layers).reverse().map((layer) => {
        const image = layer.name;
        const name = image.replace(CONFIG.IMAGE_EXT, '');
        return `${baseSelector}(${nameAttr}="${name}")`;
    }).value().join('\n');
};
