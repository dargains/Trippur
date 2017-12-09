import React from "react";
import Searchbar from "./Searchbar";

import lang from "../lang";

export default(props) => (
  <section className="hero">
    <div className="inner-hero" style={{backgroundImage: `url('http://trippur.azurewebsites.net/Trippur/dist/assets/images/homepage-bg.png')`}}></div>
    <div className="wrapper">
      <h1><strong>{lang[props.lang].Hero.title1}</strong> {lang[props.lang].Hero.title2}</h1>
      <div className="booking-mask">
        <Searchbar lang={props.lang}/>
      </div>
    </div>
    <a href="" className="arrow-down">
      <i className="icon-chevron-thin-down"></i>
    </a>
  </section>
)
