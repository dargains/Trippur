import React from "react";

export default (props) => (
  <div className="checkField">
    <input type="checkbox" name={props.group} id={props.id} onChange={props.handleClick}/>
    <label htmlFor={props.id}>{props.label}</label>
  </div>
)
