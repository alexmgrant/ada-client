const path = require('path');

module.exports = {
  require: [path.join(__dirname, 'src/index.scss')],
  styles: 'styleguide.styles.js',
};
