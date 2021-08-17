import React, { memo } from 'react';
// import { useEffect } from 'react';
// import {connect} from 'react-redux'
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// import { getTopBannerAction } from './store/actionCreators';
import TopBanner from './c-cpns/top-banner';
import HotRecommend from './c-cpns/hot-recommend';
import NewAlbum from './c-cpns/new-album';
import RecommendRanking from './c-cpns/recommend-ranking';
import UserLogin from './c-cpns/user-login';
import SettleSinger from './c-cpns/settle-singer';
import HotAnchor from './c-cpns/hot-anchor';

import { RecommendWrapper, Content, RecommendLeft, RecommendRight } from './style';

// store中使用redux-immutable合并代码后，需要通过immutable中的get方式拿到recommend对象，immutable优化后代码
// 使用hooks重构
function Recommend() {
  // 以下代码移入c - cpns中的top - banner;
  // // 组件和redux关联，获取数据和进行操作
  // // 通过hooks拿到store中的数据
  // // shallowEqual将state中的数据进行浅层比较，提高性能
  // const { topBanners } = useSelector(
  //   state => ({
  //     // topBanners: state.get('recommend').get('topBanners'),
  //     // getIn()传入一个可迭代对象，先取第一层recommend，再取第二层topBanners
  //     topBanners: state.getIn(['recommend', 'topBanners']),
  //   }),
  //   shallowEqual
  // );
  // const dispatch = useDispatch();
  // // 括号内的dispatch：当dispatch发生改变后就重新发送网络请求
  // useEffect(() => {
  //   dispatch(getTopBannerAction());
  // }, [dispatch]);
  return (
    <RecommendWrapper>
      <TopBanner />
      <Content className='wrap-v2'>
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RecommendRanking />
        </RecommendLeft>
        <RecommendRight>
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
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
