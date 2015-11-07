var path = require('path')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var merge = require('webpack-merge')

var TARGET = process.env.npm_lifecycle_event
var ROOT_PATH = path.resolve(__dirname)

var common = {
  entry: path.resolve(ROOT_PATH, 'app'),
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.(|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'file-loader' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
    ],
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Civil-Tom',
    }),
  ],
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel', 'eslint'],
          include: path.resolve(ROOT_PATH, 'app'),
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      port: 5000,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  })
}
