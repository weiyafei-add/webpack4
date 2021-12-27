import React, { Suspense, lazy } from "react";
import { Redirect } from "react-router-dom";

// import Home from "../pages/home";
// import SingerList from "../pages/singer-list";
// import Recommend from "../pages/recommend";
// import Hot from "../pages/hot";
// import RecommendDetail from "../pages/recommend-detail";

const Home = lazy(() => import("../pages/home"));
const Recommend = lazy(() => import("../pages/recommend"));
const Hot = lazy(() => import("../pages/hot"));
const RecommendDetail = lazy(() => import("../pages/recommend-detail"));
const SingerList = lazy(() => import("../pages/singer-list"));

const getComponent = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<div>123</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export const HomeRouter = [
  {
    path: "/",
    component: getComponent(Home),
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/recommend"} />,
      },
      {
        path: "/recommend",
        component: getComponent(Recommend),
        routes: [
          {
            path: "/recommend/:id",
            exact: true,
            component: getComponent(RecommendDetail),
          },
        ],
      },
      {
        path: "/hot",
        component: Hot,
      },
      {
        path: "/singerlist",
        component: getComponent(SingerList),
      },
    ],
  },
];
