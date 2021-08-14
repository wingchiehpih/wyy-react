import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import cReducer from './reducer';

// 如果安装了插件则取出插件中的compose，如果没有安装则默认使用redux中的
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(cReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
// 完成导出store后去App中共享store
