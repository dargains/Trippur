import React from "react";
import lang from "../lang";

export default (props) => (
  <div className="pleaseWait">
    <h1>{lang[props.lang].Pleasewait.title}</h1>
    <h2>{lang[props.lang].Pleasewait.subtitle}</h2>
  </div>
)
