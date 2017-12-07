import React from "react";

export default (props) => (
  <div className="checkField">
    <input type="checkbox" name={props.name} id={props.id} onChange={props.handleClick} defaultChecked={props.checked}/>
    <label htmlFor={props.id}>{props.label}</label>
  </div>
)
