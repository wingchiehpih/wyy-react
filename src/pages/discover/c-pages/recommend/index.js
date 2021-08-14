import React, { memo, useEffect } from 'react';
// import {connect} from 'react-redux'
import { useDispatch, useSelector } from 'react-redux';

import { getTopBannerAction } from './store/actionCreators';

// 使用hooks重构
function Recommend() {
  // 组件和redux关联，获取数据和进行操作
  // 通过hooks拿到store中的数据
  const { topBanners } = useSelector(state => ({
    topBanners: state.recommend.topBanners,
  }));
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
