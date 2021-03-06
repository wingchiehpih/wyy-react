import React from 'react';
import { Redirect } from 'react-router-dom';
// 路由懒加载实现
const Discover = React.lazy(() => import('@/pages/discover'));
const Recommend = React.lazy(() => import('../pages/discover/c-pages/recommend'));
const Ranking = React.lazy(() => import('../pages/discover/c-pages/ranking'));
const Songs = React.lazy(() => import('../pages/discover/c-pages/songs'));
const Djradio = React.lazy(() => import('../pages/discover/c-pages/djradio'));
const Artist = React.lazy(() => import('../pages/discover/c-pages/artist'));
const Album = React.lazy(() => import('../pages/discover/c-pages/album'));
const Player = React.lazy(() => import('../pages/player'));

const Friend = React.lazy(() => import('../pages/friend'));
const Mine = React.lazy(() => import('../pages/mine'));
// import Discover from '@/pages/discover';
// import Recommend from '../pages/discover/c-pages/recommend';
// import Ranking from '../pages/discover/c-pages/ranking';
// import Songs from '../pages/discover/c-pages/songs';
// import Djradio from '../pages/discover/c-pages/djradio';
// import Artist from '../pages/discover/c-pages/artist';
// import Album from '../pages/discover/c-pages/album';
// import Player from '../pages/player';

// import Mine from '@/pages/mine';
// import Friend from '@/pages/friend';

const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to='/discover' />,
  },
  {
    path: '/discover',
    component: Discover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to='/discover/recommend' />,
      },
      {
        path: '/discover/recommend',
        component: Recommend,
      },
      {
        path: '/discover/ranking',
        component: Ranking,
      },
      {
        path: '/discover/songs',
        component: Songs,
      },
      {
        path: '/discover/djradio',
        exact: true,
        component: Djradio,
      },
      {
        path: '/discover/artist',
        component: Artist,
      },
      {
        path: '/discover/album',
        component: Album,
      },
      {
        path: '/discover/player',
        component: Player,
      },
    ],
  },
  {
    path: '/mine',
    component: Mine,
  },
  {
    path: '/friend',
    component: Friend,
  },
];
export default routes;
