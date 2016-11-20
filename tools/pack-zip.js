var zip = require('zip-dir');

console.log('Packing archive...');
zip('./dist/sc-repeat-playlist', { saveTo: './dist/sc-repeat-playlist.zip' }, err => {
  if (err) {
    console.error('Error', err);
  } else {
    console.log('Done');
  }
});
