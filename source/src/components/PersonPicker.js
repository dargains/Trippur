import React from "react";
import Radiobutton from "./Radiobutton";

import lang from "../lang";

export default (props) => (
  <div className="personPicker">
    <p>{props.label}</p>
    <div className="personPicker__container">
      <p className="personPicker__title">{lang[props.lang].PersonPicker.adults}: </p>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"adults_count",false)}>-</i>
      <span>{props.adults_count}</span>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"adults_count",true)}>+</i>
    </div>
    <div className="personPicker__container">
      <p className="personPicker__title">{lang[props.lang].PersonPicker.children}: </p>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"children_count",false)}>-</i>
      <span>{props.children_count}</span>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"children_count",true)}>+</i>
    </div>
    <div className="personPicker__container">
      <p className="personPicker__title">{lang[props.lang].PersonPicker.infants}: </p>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"infants_count",false)}>-</i>
      <span>{props.infants_count}</span>
      <i className="personPicker__icon" onClick={props.changePeople.bind(this,"infants_count",true)}>+</i>
    </div>
    {
      props.class &&
      <div className="personPicker__container">
        <p>Class</p>
        <Radiobutton
          id="first"
          group="class"
          label={lang[props.lang].PersonPicker.class.first}
          selected={props.cabin === "first"}
          handleClick={props.classSelect}
        />
        <Radiobutton
          id="business"
          group="class"
          label={lang[props.lang].PersonPicker.class.business}
          selected={props.cabin === "business"}
          handleClick={props.classSelect}
        />
        <Radiobutton
          id="economy"
          group="class"
          label={lang[props.lang].PersonPicker.class.economy}
          selected={props.cabin === "economy"}
          handleClick={props.classSelect}
        />
      </div>
    }
  </div>
)
