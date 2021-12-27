import React, { useEffect, useState, useCallback } from "react";
import LessonList from "./components/lesson-list";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import "./index.less";

const Home = (props: any) => {
  return (
    <div>
      <div>
        <Link to={"/"}>推荐</Link>
        <Link to={"/hot"}>热门</Link>
        <Link to={"/singerlist"}>列表</Link>
        {/* {renderRoutes(props.route.routes)} */}
      </div>
    </div>
  );
};

export default Home;
