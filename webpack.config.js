const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: ["./client/index.tsx"],
    vendor: ["react", "react-dom"]
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "dist", "client")
  },

  devtool: "source-map",

  devServer: {
    contentBase: path.join(__dirname, "dist", "client"),
    compress: true,
    port: 3200
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)(x)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(s)?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "client", "index.html")
    })
  ]
};
