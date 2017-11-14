const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let config = {
  entry: './src/index',

  output: {
    filename: './umd/viser-vue.js',
    library: 'ViserVue',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  externals: {
    'vue': 'Vue',
  },

  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loaders: [{
        loader: 'ts-loader'
      }],
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    })
  );

  config.output.filename = './umd/viser-vue.min.js';
}

if (env === 'analyse') {
  config.plugins.push(
    new BundleAnalyzerPlugin()
  );
}

module.exports = config;
