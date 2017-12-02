import React from "react";
import Radiobutton from "./Radiobutton";

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
    {
      props.class &&
      (<div className="personPicker__container">
        <p>Class</p>
        <Radiobutton id="first" group="class" label="First Class" selected={props.cabin === "first"} handleClick={props.classSelect}/>
        <Radiobutton id="business" group="class" label="Business" selected={props.cabin === "business"} handleClick={props.classSelect}/>
        <Radiobutton id="economy" group="class" label="Economy" selected={props.cabin === "economy"} handleClick={props.classSelect}/>
      </div>)
    }
  </div>
)
