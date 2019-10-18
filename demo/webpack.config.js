const path = require('path');
const webpack = require('webpack');
const vueLoaderConfig = require('./vue-loader.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: '#inline-source-map',
  entry: ['./index.tsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/build/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.vue'],
    alias: {
      viser: path.resolve(__dirname, '../packages/viser/src/index'),
      'viser-react': path.resolve(__dirname, '../packages/viser-react/src/index'),
      'viser-vue': path.resolve(__dirname, '../packages/viser-vue/src/index'),
      'viser-ng': path.resolve(__dirname, '../packages/viser-ng/src/index'),
      'viser-cell-vue': path.resolve(__dirname, '../packages/viser-cell-vue/src/index'),
      'viser-cell': path.resolve(__dirname, '../packages/viser-cell/src/index'),
      'viser-graph': path.resolve(__dirname, '../packages/viser-graph/src/index'),
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [path.resolve(__dirname, '../packages/viser-ng/node_modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin()
  ]
};
