const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'mydata.js',
    path: path.resolve(__dirname, 'dist')
  }
};