const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

let config = {
  entry: './src/index.tsx',

  output: {
    filename: './umd/viser-react.js',
    library: 'ViserReact',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },

  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      // include: [
      //   path.resolve(__dirname, 'src'),
      // ],
      loaders: [{
        loader: 'ts-loader'
      }],
    }]
  },

  plugins: [
    new LodashModuleReplacementPlugin({
      collections: true,
      shorthands: true,
    }),
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

  config.output.filename = './umd/viser-react.min.js';
}

if (env === 'analyse') {
  config.plugins.push(
    new BundleAnalyzerPlugin()
  );
}

module.exports = config;
