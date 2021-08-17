import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { HOT_RECOMMEND_LIMIT } from '@/common/contants';

import HYThemeHeaderRCM from '@/components/theme-header-rcm';
import HYSongsCover from '@/components/songs-cover';
import { HotRecommendWrapper } from './style';
import { getHotRecommendAction } from '../../store/actionCreators';

export default memo(function HotRecommend() {
  // state

  // redux hooks
  // 通过hooks获取网络请求后保存到redux中的数据
  const { hotRecommends } = useSelector(
    state => ({
      hotRecommends: state.getIn(['recommend', 'hotRecommends']),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  // other hooks
  // 组件内通过接口调用aciton获取想对应的数据并将数据保存到redecer中
  useEffect(() => {
    // 通过常量设置数据
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT));
  }, [dispatch]);

  return (
    <HotRecommendWrapper>
      <HYThemeHeaderRCM title='热门推荐' keywords={['华语', '流行', '民谣', '摇滚', '电子']} />
      <div className='recommend-list'>
        {hotRecommends.map((item, index) => {
          return <HYSongsCover key={item.id} info={item} />;
        })}
      </div>
    </HotRecommendWrapper>
  );
});
