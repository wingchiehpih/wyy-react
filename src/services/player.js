import request from './request';

export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids,
    },
  });
}
// 请求歌手数据
export function getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id,
    },
  });
}
