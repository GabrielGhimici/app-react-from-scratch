module.exports = {
  entry: "./client/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist/client"
  },

  devtool: "source-map",

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

  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};
