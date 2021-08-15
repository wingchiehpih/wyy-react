// redux-immutable中也有一个combineReducers函数，自动将生成的对象转化为immutable对象，内部进行合并和转化
import { combineReducers } from 'redux-immutable';

import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store';

const cReducer = combineReducers({
  recommend: recommendReducer,
});
export default cReducer;

// 原代码
// import { combineReducers } from 'redux';
// import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store';
// const cReducer = combineReducers({
//   recommend: recommendReducer,
// });
// export default cReducer;
