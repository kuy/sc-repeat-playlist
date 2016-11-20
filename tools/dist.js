var fs = require('fs-extra');
var EXCLUDE = ['node_modules', '.git', 'docs', 'dist', 'README.md', '.DS_Store', 'src', 'webpack.config.js', 'package.json', 'tools', '.babelrc', '.flowconfig'];

console.log('Preparing distribution...');

fs.remove('./dist', () => {
  var opts = {
    filter: path => !(EXCLUDE.map(name => path.indexOf(name) !== -1).reduce((p, b) => p || b, false))
  };
  fs.copy('.', './dist', opts, () => {
    console.log('Done');
  });
});
