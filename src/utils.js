export function determinePlaying(href) {
  const mark = '?in=';
  const start = href.indexOf(mark);
  if (start !== -1) {
    return {
      track: href.slice(0, start),
      playlist: '/' + href.slice(start + mark.length)
    };
  } else {
    return { track: href };
  }
}

export function extractClientId(script) {
  const mark = 'client_id:"';
  let start = script.indexOf(mark);
  start += mark.length;
  const end = script.indexOf('"', start);
  return script.slice(start, end);
}

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
            // TODO: Error handling
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

export function get(url, payload) {
  // TODO: Error handling
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
