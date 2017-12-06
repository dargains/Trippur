import React from 'react';

export default(props) => (
  <article className="hotelItem" id={props.id}>
    <figure>
      <img src={props.image} alt={props.name}/>
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
        <p>{props.satisfaction_description} ({props.total_reviews !== null ? props.total_reviews : "No"} reviews)</p>
      </div>
      <div className="hotelList">
        <ul>
          {props.room_rates.map(rate => <li key={rate.id}><p onClick={props.onRateClick.bind(this,props.id,rate.id)} ><span>€{rate.price_str}</span>{rate.provider_name}</p></li>)}
        </ul>
      </div>
    </div>
    <aside className="right">
      <div className="hotelPriceContainer">
        <p className="hotelPrice">
          {props.currency}{props.room_rate_min.price_str}
          <span>{props.room_rate_min.provider_name}</span>
        </p>
        <p className="btn" onClick={props.onRateClick.bind(this,props.id,props.room_rate_min.id)}><span>VIEW DEAL</span></p>
      </div>
    </aside>
  </article>
)
