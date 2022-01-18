const CopyPlugin = require('copy-webpack-plugin');
var path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'controller.html',
      inject: 'head',
    }),
    new CopyPlugin({
      patterns: [{ from: 'bundle.json', to: 'bundle.json' }],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 4000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
