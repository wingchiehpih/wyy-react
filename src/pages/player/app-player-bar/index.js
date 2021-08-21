import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Slider } from 'antd';
import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils';
import { getSongDetailAction } from '../store/actionCreators';

import { PlaybarWrapper, Control, PlayInfo, Operator } from './style';

export default memo(function AppPlayerBar() {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // 获取 redux中保存的数据
  const { currentSong } = useSelector(
    state => ({
      currentSong: state.getIn(['player', 'currentSong']),
    }),
    shallowEqual
  );
  const audioRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongDetailAction(167876));
  }, [dispatch]);
  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id);
  }, [currentSong]);
  // 判断是否有值，有值则使用curren中请求到的值，如果没有则使用占位符后面的值
  const picUrl = (currentSong.al && currentSong.al.picUrl) || '';
  // 判断歌手是否有值，有值的情况下设置对应的歌手名称。如果没有值使用默认歌手
  const singerName = (currentSong.ar && currentSong.ar[0].name) || '未知歌手';
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, 'mm:ss');

  const playMusic = useCallback(() => {
    if (!isPlaying) {
      console.log('BOFANG');
      audioRef.current.play();
    } else {
      console.log('暂停');
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const timeUpdate = e => {
    setCurrentTime(e.target.currentTime * 1000);
    if (!isChanging) {
      setProgress((currentTime / duration) * 100);
    }
  };
  const showCurrentTime = formatDate(currentTime, 'mm:ss');

  // const sliderChange = useCallback(value => {
  //   setProgress(value);
  // }, []);
  // const sliderAfterChange = useCallback(() => {
  //   console.log('end');
  // }, []);
  const sliderChange = useCallback(
    value => {
      setIsChanging(true);
      const currentTime = (value / 100) * duration;
      setCurrentTime(currentTime);
      setProgress(value);
    },
    [duration]
  );

  const sliderAfterChange = useCallback(
    value => {
      const currentTime = ((value / 100) * duration) / 1000;
      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime * 1000);
      setIsChanging(false);
      // 未播放滑动松手实现自动继续播放效果
      if (!isPlaying) {
        playMusic();
      }
    },
    [duration, isPlaying, playMusic]
  );
  // 当把一个回调函数传到自定义组件内部时，使用callback钩子
  return (
    <PlaybarWrapper className='sprite_player'>
      <div className='content wrap-v2'>
        <Control isPlaying={isPlaying}>
          <button className='sprite_player prev'></button>
          <button className='sprite_player play' onClick={playMusic}></button>
          <button className='sprite_player next'></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <a href='/#'>
              <img src={getSizeImage(picUrl, 35)} alt='' />
            </a>
          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{currentSong.name}</span>
              <a href='#/' className='singer-name'>
                {singerName}
              </a>
              <div className='progress'>
                <Slider
                  defaultValue={0}
                  value={progress}
                  onChange={sliderChange}
                  onAfterChange={sliderAfterChange}
                />
                <div className='time'>
                  <span className='now-time'>{showCurrentTime}</span>
                  <span className='divider'>/</span>
                  <span className='duration'>{showDuration}</span>
                </div>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className='left'>
            <button className='sprite_player btn favor'></button>
            <button className='sprite_player btn share'></button>
          </div>
          <div className='right sprite_player'>
            <button className='sprite_player btn volume'></button>
            <button className='sprite_player btn loop'></button>
            <button className='sprite_player btn playlist'></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} />
    </PlaybarWrapper>
  );
});
