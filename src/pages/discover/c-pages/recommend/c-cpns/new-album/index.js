import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { getNewAlbumAction } from '../../store/actionCreators';

import { Carousel } from 'antd';
import AlbumCover from '@/components/album-cover';
import ThemeHeaderRCM from '@/components/theme-header-rcm';
import { AlbumWrapper } from './style';

export default memo(function NewAlbum() {
  // redux hooks
  // 获取redux中的数据
  const { newAlbums } = useSelector(
    state => ({
      newAlbums: state.getIn(['recommend', 'newAlbums']),
    }),
    shallowEqual
  );
  const pageRef = useRef();
  // 组件内发送网络请求获取数据的步骤
  // other hooks
  // 括号内dispath的意思：依赖dispath当dispath发生改变后代码重新执行
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewAlbumAction(10));
  }, [dispatch]);

  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title='新碟上架' />
      <div className='content'>
        <button
          className='arrow arrow-left sprite_02'
          onClick={e => pageRef.current.prev()}></button>
        <div className='album'>
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map(item => {
              return (
                <div key={item} className='page'>
                  {newAlbums.slice(item * 5, (item + 1) * 5).map(iten => {
                    return (
                      <AlbumCover key={iten.id} info={iten} size={100} width={118} bgp='-570px' />
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <button
          className='arrow arrow-right sprite_02'
          onClick={e => pageRef.current.next()}></button>
      </div>
    </AlbumWrapper>
  );
});
