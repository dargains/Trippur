import React from "react";

export default (props) => (
  <section className="sort">
    <div className="wrapper">
      <ul>
        <li>Departure</li>
        <li className="selected">Duration</li>
        <li>Arrival</li>
        <li>Airlines</li>
        <li>Price<span className="icon-triangle-down" /></li>
      </ul>
    </div>
  </section>
)
