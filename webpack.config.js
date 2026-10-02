const path = require('path');

module.exports = {
  entry: './assets/src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets/js'),
  },
  mode: 'production',
};
