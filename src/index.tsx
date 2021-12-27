import React from "react";
import * as ReactDom from "react-dom";
import App from "./app";

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

ReactDom.render(<App />, document.getElementById("root"));
