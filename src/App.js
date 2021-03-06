import React, { memo, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './router';
import store from './store';
// 使用store总的共享数据，首先导入store和Provider,使用store属性共享数据
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import AppPlayerBar from './pages/player/app-player-bar';
// 使用路由懒加载后需要使用suspense
export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        <Suspense fallback={<div>page Loading</div>}>{renderRoutes(routes)}</Suspense>
        <AppFooter />
        <AppPlayerBar />
      </HashRouter>
    </Provider>
  );
});
