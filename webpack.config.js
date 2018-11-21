const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "app.js",
    path: __dirname + '/production'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "estilo.css"
    }),
    new HtmlWebpackPlugin()
  ],

  // correct
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/"
          }
        }]
      },

      {
        test: /\.(png|jpg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        }
      }

      // {
      //   test: /\.ttf$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         outputPath: "fonts/"
      //       }
      //     }
      //   ]
      // }
    ]
  }

  // module: {
  //   loaders: {
  //       test: /\.jsx$/,
  //       loader: 'babel-loader',
  //       query: {
  //           presets: ['es2015']
  //       }
  //   },
  //   rules: [
  //     {
  //       test: /\.s?[ac]ss$/,
  //       use: [
  //         MiniCssExtractPlugin.loader,
  //         // 'style-loader', // Adiciona CSS a DOM injetando a tag <style>
  //         "css-loader", // interpreta @import, url()...
  //         "sass-loader"
  //       ]
  //     },
  //     {
  //       test: /\.(png|svg|jpg|gif|ttf)$/,
  //       use: ["file-loader"]
  //     },

  //   ]
  // }
};
