const Compression = require("compression-webpack-plugin");
const path = require("path");
const entryPath = "src";
const entryFile = "app.js";

module.exports = {
  entry: ["whatwg-fetch", `./${entryPath}/js/${entryFile}`],
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, `${entryPath}/build`)
  },
  devServer: {
    contentBase: path.join(__dirname, `${entryPath}`),
    publicPath: "/build/",
    compress: true,
    port: 5000
  },
  mode: "development",
  devtool: "source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            } 
          }
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: "file-loader",
        options: {
            name: "[name].[ext]",
            publicPath: "/images/",
            outputPath: "/images/"
        }
      }
    ]
  },
  plugins: [
    new Compression({
        threshold: 0,
        minRatio: 0.8
    })
  ]
};