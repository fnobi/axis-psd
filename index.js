const PSD = require('psd');

const argv = require('optimist').argv;

const filePath = argv._.shift();

if (!filePath) {
    throw new Error('no file path.');
}

PSD.open(filePath).then((psd) => {
    console.log(psd.tree().export());
});

