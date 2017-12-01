import React from 'react';

import image from "../images/hotel-example.png";

const HotelItem = (props) => {
  return (
    <article className="hotelItem">
      <figure>
        <img src={props.image} />
      </figure>
      <div className="center">
        <div className="hotelHeader">
          <h2>{props.name}</h2>
          <ul data-rating={props.stars}>
            <li className="icon-star-full"></li>
            <li className="icon-star-full"></li>
            <li className="icon-star-full"></li>
            <li className="icon-star-full"></li>
            <li className="icon-star-full"></li>
          </ul>
          <p>{props.satisfaction_description} ({props.total_reviews} reviews)</p>
        </div>
        <div className="hotelList">
          <ul>
            {props.room_rates.map(rate => <li key={rate.id}><a href="" target="_blank"><span>€{rate.price_str}</span>{rate.provider_name}</a></li>)}
          </ul>
        </div>
      </div>
      <aside className="right">
        <div className="hotelPrice">
          <p>
            €{props.room_rate_min.price_str}
            <span>{props.room_rate_min.provider_name}</span>
          </p>
          <a href="#" className="btn" target="_blank"><span>VIEW DEAL</span></a>
        </div>
      </aside>
    </article>
  )
}
export default HotelItem;
