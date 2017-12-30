const webpack = require('webpack');

module.exports = {
  // エントリーポイントの設定
  entry: {
  'dist/index': './scripts/controller/index.js',
  'dist/calender': './scripts/controller/calender.js'
　},

  // 出力の設定
output: {
    // 出力するファイル
    path: __dirname,
    filename: '[name]-bundle.js',
    // 出力先のパス
},
module: {
    loaders: [
        { test: /\.html$/, loader: 'html-loader' },
        { test: /\.css$/, loaders: ['style-loader','css-loader'] },
        { test: /\.(jpg|png)$/,loaders: 'url-loader'},
    ]
}
};
