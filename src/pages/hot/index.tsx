import React, { ChangeEvent, useEffect, useState } from "react";
import "./index.less";
import { Input } from "antd";
const prefix = "hot-ht";

const Hot = () => {
  const [userInfo, setUserInfo] = useState({
    username: null,
    password: null,
  });

  const handleFormChange = (dataType: string) => (event: any) => {
    setUserInfo({ ...userInfo, [dataType]: event.target.value });
  };

  return (
    <div>
      <div>函数柯里化</div>
      <div>
        <p>1. 若一个函数，接受的参数是一个函数，那么这个函数就称之为高阶函数</p>
        <p>
          1.
          若一个函数，调用的返回值依然是一个函数，那么这个函数就称之为高阶函数
        </p>
        <p>
          通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式
        </p>
      </div>

      <div className={`${prefix}-sdafasd`}>
        <Input
          style={{ width: 200 }}
          placeholder={"请输入账号"}
          onChange={handleFormChange("username")}
        />
        <br />
        <Input
          style={{ width: 200 }}
          placeholder={"请输入密码"}
          onChange={handleFormChange("password")}
        />
      </div>
    </div>
  );
};
export default Hot;
