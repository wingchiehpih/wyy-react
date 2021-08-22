import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Slider, message } from 'antd';
import { NavLink } from 'react-router-dom';

import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils';
import {
  changeSequenceAction,
  getSongDetailAction,
  changeCurrentIndexAndSongAction,
  changeCurrentLyricIndexAction,
} from '../store/actionCreators';

import { PlaybarWrapper, Control, PlayInfo, Operator } from './style';

export default memo(function AppPlayerBar() {
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // 获取 redux中保存的数据
  const { currentSong, sequence, playList, currentLyricIndex, lyricList } = useSelector(
    state => ({
      currentSong: state.getIn(['player', 'currentSong']),
      sequence: state.getIn(['player', 'sequence']),
      playList: state.getIn(['player', 'playList']),
      lyricList: state.getIn(['player', 'lyricList']),
      currentLyricIndex: state.getIn(['player', 'currentLyricIndex']),
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
    audioRef.current
      .play()
      .then(res => {
        setIsPlaying(true);
      })
      .catch(err => {
        setIsPlaying(false);
      });
  }, [currentSong]);
  // 判断是否有值，有值则使用curren中请求到的值，如果没有则使用占位符后面的值
  const picUrl = (currentSong.al && currentSong.al.picUrl) || '';
  // 判断歌手是否有值，有值的情况下设置对应的歌手名称。如果没有值使用默认歌手
  const singerName = (currentSong.ar && currentSong.ar[0].name) || '未知歌手';
  const duration = currentSong.dt || 0;
  const showDuration = formatDate(duration, 'mm:ss');

  const playMusic = useCallback(() => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const timeUpdate = e => {
    const currentTime = e.target.currentTime;
    if (!isChanging) {
      setCurrentTime(currentTime * 1000);
      setProgress(((currentTime * 1000) / duration) * 100);
    }

    // 获取当前的歌词
    let i = 0;
    for (; i < lyricList.length; i++) {
      let lyricItem = lyricList[i];
      if (currentTime * 1000 < lyricItem.time) {
        break;
      }
    }
    // 性能优化
    if (currentLyricIndex !== i - 1) {
      dispatch(changeCurrentLyricIndexAction(i - 1));
      const content = lyricList[i - 1] && lyricList[i - 1].content;
      message.open({
        key: 'lyric',
        content: content,
        duration: 0,
        className: 'lyric-class',
      });
    }
  };
  const showCurrentTime = formatDate(currentTime, 'mm:ss');

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
  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  };

  // 点击进入前一首后一首歌曲
  const changeMusic = tag => {
    dispatch(changeCurrentIndexAndSongAction(tag));
  };
  // 监听歌曲播放结束后的执行事件
  const handleMusicEnded = () => {
    // 单曲循环的情况
    if (sequence === 2 || playList.length === 1) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(changeCurrentIndexAndSongAction(1));
    }
  };
  return (
    <PlaybarWrapper className='sprite_player'>
      <div className='content wrap-v2'>
        <Control isPlaying={isPlaying}>
          <button className='sprite_player prev' onClick={e => changeMusic(-1)}></button>
          <button className='sprite_player play' onClick={playMusic}></button>
          <button className='sprite_player next' onClick={e => changeMusic(-1)}></button>
        </Control>
        <PlayInfo>
          <div className='image'>
            <NavLink to='/discover/player'>
              <img src={getSizeImage(picUrl, 35)} alt='' />
            </NavLink>
          </div>
          <div className='info'>
            <div className='song'>
              <span className='song-name'>{currentSong.name}</span>
              <a href='#/' className='singer-name'>
                {singerName}
              </a>
              <div className='progress'>
                <Slider
                  tooltipVisible={false}
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
        <Operator sequence={sequence}>
          <div className='left'>
            <button className='sprite_player btn favor'></button>
            <button className='sprite_player btn share'></button>
          </div>
          <div className='right sprite_player'>
            <button className='sprite_player btn volume'></button>
            <button className='sprite_player btn loop' onClick={changeSequence}></button>
            <button className='sprite_player btn playlist'>{playList.length}</button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleMusicEnded} />
    </PlaybarWrapper>
  );
});
