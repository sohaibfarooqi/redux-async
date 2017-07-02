const path = require('path');

module.exports = {
  
  entry: __dirname + "/reddit/index.js",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js", 
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
    ],
  }
}