const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './main.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader?modules",
            options: { url: false }
          }
        ]
      },
      {
        loader: 'ts-loader',
        test: /\.tsx?$/,
        exclude: [
          /node_modules/
        ],
        options: {
          configFile: 'tsconfig.json'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd"
  },
//  optimization: {
//    minimize: true
//  }
};
