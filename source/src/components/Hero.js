import React from "react";

export default(props) => (
  <section className="hero">
    <div className="inner-hero" style={{backgroundImage: `url('http://trippur.azurewebsites.net/Trippur/dist/assets/images/homepage-bg.png')`}}></div>
    <div className="wrapper">
      <h1><strong>Explore.</strong>Compare. Book.</h1>
      <div className="booking-mask">
        Filter
      </div>
    </div>
    <a href="#" className="arrow-down">
      <i className="icon-chevron-thin-down"></i>
    </a>
  </section>
)
