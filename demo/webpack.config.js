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
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    alias: {
      viser: '../../viser/src/index',
      'viser-react': '../../viser-react/src/index',
      'viser-ng': '../../viser-ng/src/index'
    },
    symlinks: false
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [new webpack.NamedModulesPlugin()]
};
