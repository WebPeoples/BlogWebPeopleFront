const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/App.js",
  output: {
    filename: "index.js",
    path: __dirname + "/production"
  },

  module: {
    loaders: {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
    },
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // Adiciona CSS a DOM injetando a tag <style>
          "css-loader", // interpreta @import, url()...
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: ["file-loader"]
      },
       
    ]
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/
      }
    ]
  }
};
