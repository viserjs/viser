const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const createLodashAliases = require('lodash-loader').createLodashAliases;

let config = {
  entry: './src/index.ts',

  output: {
    filename: './umd/viser.js',
    library: 'Viser',
    libraryTarget: 'umd',
  },

  resolve: {
    alias: createLodashAliases(),
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      loader: 'ts-loader!lodash-loader',
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

  config.output.filename = './umd/viser.min.js';
}

if (env === 'analyse') {
  config.plugins.push(
    new BundleAnalyzerPlugin()
  );
}

module.exports = config;
