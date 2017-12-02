import React from "react";

export default (props) => (
  <div className="radioField">
    <input type="radio" name={props.group} id={props.id} onChange={props.handleClick} defaultChecked={props.selected}/>
    <label htmlFor={props.id}>{props.label}</label>
  </div>
)
