import React from "react";
import Searchbar from "./Searchbar";

import lang from "../lang";

import image0 from "../images/back0.jpg";
import image1 from "../images/back1.jpg";
import image2 from "../images/back2.jpg";
import image3 from "../images/back3.jpg";
const images = [image0,image1,image2,image3];

export default(props) => (
  <section className="hero">
    <div className="inner-hero"><div style={{backgroundImage: `url(${images[Math.floor(Math.random() * 4)]})`}}></div></div>
    <div className="wrapper">
      <h1><strong>{lang[props.lang].Hero.title1}</strong> {lang[props.lang].Hero.title2}</h1>
      <div className="booking-mask">
        {navigator.onLine
          ? <Searchbar lang={props.lang}/>
          : <h2>Busca offline</h2>
        }
      </div>
    </div>
    {/* <a href="" className="arrow-down">
      <i className="icon-chevron-thin-down"></i>
    </a> */}
  </section>
)
