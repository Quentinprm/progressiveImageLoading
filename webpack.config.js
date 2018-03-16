const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var commonConfig = {

  output: {
    path: path.resolve(__dirname + '/dist/'),
  },

  module: {

    loaders: [ 
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]

  },

  plugins: [ 
   new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ],
};

module.exports = [
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-progressive-image-loading.min.js',
      libraryTarget: 'window',
      library: 'VueProgressiveImageLoading',
    }
  }),

  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/ProgressiveImageLoading.vue'),
    output: {
      filename: 'vue-progressive-image-loading.js',
      libraryTarget: 'umd',
      library: 'vue-progressive-image-loading',
      umdNamedDefine: true
    }
  })
];