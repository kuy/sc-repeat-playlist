// @flow

type Playing = {
  track: string,
  playlist: ?string,
};

export function determinePlaying(href: string): Playing {
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
