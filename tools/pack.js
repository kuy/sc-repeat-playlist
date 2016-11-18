var zip = require('zip-dir');
var EXCLUDE = ['node_modules', '.git', 'README.md', '.DS_Store', 'src', 'webpack.config.js', 'package.json', 'tools', '.babelrc'];

console.log('Packing Chrome extension...');

zip('.', { saveTo: '../sc-repeat-playlist-extension.zip', filter: (path, stat) =>
  !(EXCLUDE.map(name => path.indexOf(name) !== -1).reduce((p, b) => p || b, false))
}, () => {
  console.log('Done');
});
