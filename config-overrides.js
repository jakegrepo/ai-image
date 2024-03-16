
const nodeExternals = require('webpack-node-externals');

module.exports = function override(config) {
    config.externals = [nodeExternals()];

    return config;
}