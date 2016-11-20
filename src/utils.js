export function determinePlaying(href) {
  const mark = '?in=';
  const start = href.indexOf(mark);
  if (start !== -1) {
    return {
      track: href.slice(0, start),
      playlist: '/' + href.slice(start + mark.length)
    };
  } else {
    return { track: href, playlist: null };
  }
}

export function extractClientId(script) {
  const mark = 'client_id:"';
  let start = script.indexOf(mark);
  start += mark.length;
  const end = script.indexOf('"', start);
  return script.slice(start, end);
}

// TODO: Error handling
export const getClientId = (() => {
  let clientId;
  return () => {
    return new Promise((resolve, reject) => {
      if (clientId) {
        resolve(clientId);
      } else {
        for (let script of document.querySelectorAll('body > script[src]')) {
          const src = script.getAttribute('src');
          if (src.indexOf('assets/app-') !== -1) {
            get(src).then(js => {
              clientId = extractClientId(js);
              resolve(clientId);
            }, reject);
          }
        }
      }
    });
  };
})();

export function toQueryString(obj) {
  let list = [];
  for (let key of Object.keys(obj)) {
    list.push(`${key}=${encodeURIComponent(obj[key])}`);
  }
  return list.join('&');
}

// TODO: Error handling
export function get(url, payload) {
  return new Promise((resolve, reject) => {
    if (typeof payload !== 'undefined') {
      if (typeof payload !== 'string' && typeof payload === 'object') {
        payload = toQueryString(payload);
      } else {
        payload = encodeURIComponent(payload.toString());
      }
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.responseText);
      }
    };

    if (payload) {
      url = `${url}?${payload}`;
    }

    xhr.open('GET', url, true);
    xhr.send();
  });
}

export function resolve(url) {
  return new Promise((done, failed) => {
    getClientId().then(client_id => {
      get('https://api.soundcloud.com/resolve', {
        url, client_id
      }).then(body => done(JSON.parse(body)), failed);
    });
  });
}

export function isPlaying(state) {
  return !!state.player.playing;
}

export function isSameTrack(state, slug) {
  return isPlaying(state) && state.player.playing.slug === slug;
}

export function isSamePlaylist(state, slug) {
  return isPlaying(state) && state.player.playlist.slug === slug;
}

export function isTrackInPlaylist(state) {
  const { player: { playing, tracks } } = state;
  return isPlaying(state) && tracks.indexOf(playing.id) !== -1;
}

export function getPrevPlaylist(state) {
  const { player: { history } } = state;
  const list = history.filter(h => !!h.playlist);
  if (list.length === 0) {
    return;
  }
  return list[list.length - 1].playlist;
}

export function isPlaylistChanged(state): bool {
  const { player: { playlist } } = state;
  const prev = getPrevPlaylist(state);
  if (!playlist || !prev) {
    return false;
  }
  return playlist.id !== prev.id;
}
