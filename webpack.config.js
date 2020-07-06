var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry : './client/index.js',
    output : {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['@babel/preset-env', '@babel/preset-react']
            }
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    devServer: {
        historyApiFallback: true,
    }
}