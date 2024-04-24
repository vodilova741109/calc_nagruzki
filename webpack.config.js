// точка входа

const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
}

// точка выхода
module.exports = {
        output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'nagruzka.bundle.js',
    },
}