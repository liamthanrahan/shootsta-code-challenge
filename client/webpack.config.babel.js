import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import HTMLWebpackTemplate from 'html-webpack-template'

export default () => {
  const plugins = []
  plugins.push(
    new HTMLWebpackPlugin({
      template: HTMLWebpackTemplate,
      inject: false,
      title: 'Shootsta Code Challenge',
      mobile: true,
      chunks: ['main'],
      filename: 'index.html',
    })
  )

  return {
    devtool: 'source-map',
    resolve: {
      alias: { 'react-dom': '@hot-loader/react-dom' },
      modules: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules'),
      ],
    },
    resolveLoader: {
      modules: [path.join(__dirname, 'node_modules')],
    },
    entry: {
      main: ['./src/index.js'],
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    devServer: {
      open: true,
    },
    plugins,
  }
}
