const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: '#inline-source-map',
  entry: ['./index.ts'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/build/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      viser: path.resolve(__dirname, '../packages/viser/src/index'),
      'viser-react': path.resolve(__dirname, '../packages/viser-react/src/index'),
      'viser-vue': path.resolve(__dirname, '../packages/viser-vue/src/index'),
      'viser-ng': path.resolve(__dirname, '../packages/viser-ng/src/index'),
    },
    modules: [path.resolve(__dirname, '../packages/viser-ng/node_modules'), 'node_modules']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ]
};
