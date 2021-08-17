import * as actionTypes from './constants';
// import { getTopBanners } from '@/services/recommend';

import { getNewAlbums } from '@/services/recommend';

import { getTopBanners, getHotRecommends, getTopList } from '@/services/recommend';

const changeTopBannerAction = res => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
});

const changeHotRecommendAction = res => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result,
});

const changeNewAlbumAction = res => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbums: res.albums,
});

const changeUpRankingAction = res => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: res.playlist,
});

const changeNewRankingAction = res => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: res.playlist,
});

const changeOriginRankingAction = res => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: res.playlist,
});

// 发送网络代码本质上是一个函数，真正传入的是dispath这个函数
// 封装好函数，在recommend中的index中使用
export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannerAction(res));
    });
  };
};

export const getHotRecommendAction = limit => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
      dispatch(changeHotRecommendAction(res));
    });
  };
};

export const getNewAlbumAction = limit => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      // 改变state的唯一方式是通过reducer，所以要通过action中调用reducer来改变state
      // 组件内调用进行dispath是一个函数（函数进行执行），这里dispath是一个在action中定义的对象（传入到reducer中执行）
      // const albums = res.albums;
      dispatch(changeNewAlbumAction(res));
    });
  };
};

export const getTopListAction = idx => {
  return dispatch => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 0:
          dispatch(changeUpRankingAction(res));
          break;
        case 2:
          dispatch(changeNewRankingAction(res));
          break;
        case 3:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
      }
    });
  };
};
