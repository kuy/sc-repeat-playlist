# SoundCloud Repeat Playlist

A Chrome Extension providing "Repeat Playlist" feature to SoundCloud.

[SoundCloud Repeat Playlist on Chrome Web Store](https://chrome.google.com/webstore/detail/soundcloud-repeat-playlis/fammfbeojlkefamjiabfmhickdjiehgc)

![SoundCloud Repeat Playlist](https://raw.githubusercontent.com/kuy/sc-repeat-playlist/master/docs/sc-repeat-playlist.png)


## Install & Usage

1. Install [SoundCloud Repeat Playlist](https://chrome.google.com/webstore/detail/soundcloud-repeat-playlis/fammfbeojlkefamjiabfmhickdjiehgc) from Chrome Web Store
2. Open [SoundCloud](https://soundcloud.com) or reload existing tab
3. Click the repeat button of the player at the bottom of the page to change repeat modes

*Notice: Can not see the bottom player? It will be shown when you start playing something.*

### Repeat Mode

The repeat button repeats the following modes.

1. None
2. Repeat track
3. Repeat playlist

### Supported Pages

This is a list of pages that are confirmed to work.

+ /you/sets
+ /<username>/sets

### Unsupported Pages

Will be supported soon!

+ /you/sets/<name>
+ /<username>/sets/<name>


## Development

### Setup

```
$ npm install
```

### Start webpack with change detection

```
$ npm start
```

Please don't forget to load unpacked Chrome extension.

### Build Chrome extension

```
$ npm run build:dist
```

Chrome extension will be packed under `./dist` directory.


## License

GPL v3


## Author

Yuki Kodama / [@kuy](https://twitter.com/kuy)
