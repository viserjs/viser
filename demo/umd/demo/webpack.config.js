"use strict";
var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    devtool: '#inline-source-map',
    entry: [
        "./index.ts",
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: "http://localhost:3000/build/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"],
        alias: {
            'viser': '../../viser/src/index',
            'viser-react': '../../viser-react/src/index',
        },
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.tsx?$/, loader: "ts-loader" },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
    ]
};
//# sourceMappingURL=webpack.config.js.map