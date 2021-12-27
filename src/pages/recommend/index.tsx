import React, { useEffect } from "react";
import { renderRoutes } from "react-router-config";
import axios from "axios";
import AudioPlayer from "./components/audio-player";

const Recommend = (props: any) => {
  useEffect(() => {
    const fetch = axios.create({
      baseURL: "",
    });
    fetch.get("/m-api/banner").then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      {/* <li>
        <NavLink to={"/recommend/5"}>webpack模拟详情</NavLink>
      </li> */}
      <AudioPlayer />
      {props.route.routes && renderRoutes(props.route.routes)}
    </div>
  );
};
export default Recommend;
