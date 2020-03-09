const webpack = require('webpack');
const path = require('path');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = {
  // Entry points to the project
  entry: {
    main: [
      // only- means to only hot reload for successful updates
      'webpack/hot/only-dev-server',
      './src/app/index.jsx',
    ],
  },
  // Server Configuration options
  devServer: {
    contentBase: 'src/www', // Relative directory for base of server
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
  },
  devtool: 'eval',
  /*devtool: 'eval',*/
  output: {
    path: path.resolve(__dirname, 'build'), // Path of output file
    filename: 'index.jsx',
    publicPath: '/'
  },
  plugins: [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Moves files
    new TransferWebpackPlugin([
      { from: 'www' },
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query:
      {
        presets:["es2015", "stage-0", "react"]
      }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }
    ],
  },
  resolve: {
    alias: {
      "ag-grid-root": path.resolve('./node_modules/ag-grid'),
       "assets-root": path.resolve('./src/assets/translations')
    },
    extensions: ['.js', '.jsx', '.json']
  },
};

module.exports = config;
