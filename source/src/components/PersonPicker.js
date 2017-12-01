import React from "react";

export default (props) => (
  <div className="personPicker">
    <p>{props.label}</p>
    <div className="personPicker__container">
      <p className="personPicker__title">Adults: </p>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"adults_count",true)}>+</i>
      <span>{props.adults_count}</span>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"adults_count",false)}>-</i>
    </div>
    <div className="personPicker__container">
      <p className="personPicker__title">Children: </p>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"children_count",true)}>+</i>
      <span>{props.children_count}</span>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"children_count",false)}>-</i>
    </div>
    <div className="personPicker__container">
      <p className="personPicker__title">Infants: </p>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"infants_count",true)}>+</i>
      <span>{props.infants_count}</span>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"infants_count",false)}>-</i>
    </div>
  </div>
)
