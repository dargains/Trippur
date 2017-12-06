import React from "react";

export default (props) => (
  <section className="sort">
    <div className="wrapper">
      <ul>
        <li onClick={props.handleClick} data-sort="price" className="selected asc">Price</li>
        <li onClick={props.handleClick} data-sort="duration">Duration</li>
        <li onClick={props.handleClick} data-sort="outbound_departure_time ">Departure</li>
        <li onClick={props.handleClick} data-sort="inbound_departure_time ">Arrival</li>
      </ul>
    </div>
  </section>
);
