const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/dom.js'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};