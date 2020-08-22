const path = require('path')

module.exports = {
  entry: './src/main.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new (require('html-webpack-plugin'))
  ],
  optimization: {
    minimize: false
  },
  devServer: {
    open: true,
    compress: false,
    contentBase: './src'
  }
}
