import React from "react";

import lang from "../lang";

export default (props) => (
  <section className="sort">
    <div className="wrapper">
        {
          props.type === "flights"
            ? <ul>
                <li onClick={props.handleClick} data-sort="bestPrice">{lang[props.lang].Sortbar.flights.price}</li>
                <li onClick={props.handleClick} data-sort="duration">{lang[props.lang].Sortbar.flights.duration}</li>
                <li onClick={props.handleClick} data-sort="departure ">{lang[props.lang].Sortbar.flights.departure}</li>
                <li onClick={props.handleClick} data-sort="arrival ">{lang[props.lang].Sortbar.flights.arrival}</li>
              </ul>
            : <ul>
                <li onClick={props.handleClick} data-sort="reviewsCount">{lang[props.lang].Sortbar.hotels.popularity}</li>
        				<li onClick={props.handleClick} data-sort="bestPrice">{lang[props.lang].Sortbar.hotels.price}</li>
                <li onClick={props.handleClick} data-sort="star">{lang[props.lang].Sortbar.hotels.stars}</li>
              </ul>
        }
    </div>
  </section>
);
