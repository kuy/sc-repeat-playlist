var exec = require('child_process').exec;
var path = require('path');

var bin = '"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"';
var args = [
  '--pack-extension=' + path.join(__dirname, '../dist/sc-repeat-playlist'),
  '--pack-extension-key=' + path.join(process.env.HOME, '.ssh/sc-repeat-playlist-crx.pem'),
];

console.log('Packing extension...');
exec([bin].concat(args).join(' '), () => {
  console.log('Done');
});
