import React, { memo, useEffect } from 'react';
// import {connect} from 'react-redux'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getTopBannerAction } from './store/actionCreators';

// store中使用redux-immutable合并代码后，需要通过immutable中的get方式拿到recommend对象，immutable优化后代码
// 使用hooks重构
function Recommend() {
  // 组件和redux关联，获取数据和进行操作
  // 通过hooks拿到store中的数据
  // shallowEqual将state中的数据进行浅层比较，提高性能
  const { topBanners } = useSelector(
    state => ({
      // topBanners: state.get('recommend').get('topBanners'),
      // getIn()传入一个可迭代对象，先取第一层recommend，再取第二层topBanners
      topBanners: state.getIn(['recommend', 'topBanners']),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  // 括号内的dispatch：当dispatch发生改变后就重新发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);
  return (
    <div>
      <h1>{topBanners.length}</h1>
    </div>
  );
}

export default memo(Recommend);

// // immutable优化后代码
// // 使用hooks重构
// function Recommend() {
//   // 组件和redux关联，获取数据和进行操作
//   // 通过hooks拿到store中的数据
//   // shallowEqual将state中的数据进行浅层比较，提高性能
//   const { topBanners } = useSelector(
//     state => ({
//       topBanners: state.recommend.get('topBanners'),
//     }),
//     shallowEqual
//   );
//   const dispatch = useDispatch();
//   // 括号内的dispatch：当dispatch发生改变后就重新发送网络请求
//   useEffect(() => {
//     dispatch(getTopBannerAction());
//   }, [dispatch]);
//   return (
//     <div>
//       <h1>{topBanners.length}</h1>
//     </div>
//   );
// }

// export default memo(Recommend);

// // 使用hooks重构
// function Recommend() {
//   // 组件和redux关联，获取数据和进行操作
//   // 通过hooks拿到store中的数据
//   // shallowEqual将state中的数据进行浅层比较，提高性能
//   const { topBanners } = useSelector(
//     state => ({
//       topBanners: state.recommend.topBanners,
//     }),
//     shallowEqual
//   );
//   const dispatch = useDispatch();
//   // 括号内的dispatch：当dispatch发生改变后就重新发送网络请求
//   useEffect(() => {
//     dispatch(getTopBannerAction());
//   }, [dispatch]);
//   return (
//     <div>
//       <h1>{topBanners.length}</h1>
//     </div>
//   );
// }

// export default memo(Recommend);

// 使用connect原代码
// function Recommend(props) {
//   const { getBanners, topBanners } = props;
//   useEffect(() => {
//     getBanners();
//   }, [getBanners]);

//   return (
//     <div>
//       <h1>{topBanners.length}</h1>
//     </div>
//   );
// }

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners,
// });

// const mapDispatchToProps = dispatch => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction());
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));
