import React from 'react';
import moment from "moment";

const stops = ["No stops", "1 stop", "2+ stops"];

export default(props) => (
  <article className="flightItem">
    <div className="price">
      <p>£{props.best_fare.price}<span>{props.best_fare.provider_name}</span></p>
    </div>
    <ul>
      {props.outbound_segments.map(route => <li className="company" key={route.designator_code} style={{backgroundImage: `url(http://0.omg.io/wego/image/upload/c_fit,w_200,h_70/flights/airlines_rectangular/${route.airline_code}.png)`}} alt={route.airline_name} />)}
    </ul>
    <div className="flightInfo">
      {props.outbound_segments.map(route => <p key={route.designator_code} className="companyName">{route.airline_name}</p>)}
      <ul>
        {props.outbound_segments.map(route => (
          <li key={route.designator_code} data-detail>
            <p><strong>{moment(route.departure_time).format("H[h]mm[m]")}</strong>{route.departure_name}</p>
            <p><span>3h 10m</span><span>X stops</span></p>
            <p><strong>{moment(route.arrival_time).format("H[h]mm[m]")}</strong>{route.arrival_name}</p>
          </li>
        ))}
      </ul>
      <ul>
        {props.inbound_segments.map(route => (
          <li key={route.designator_code} data-detail>
            <p><strong>{moment(route.departure_time).format("H[h]mm[m]")}</strong>{route.departure_name}</p>
            <p><span>3h 10m</span><span>X stops</span></p>
            <p><strong>{moment(route.arrival_time).format("H[h]mm[m]")}</strong>{route.arrival_name}</p>
          </li>
        ))}
      </ul>
    </div>
    <div className="flightType">
      <em>{props.best_fare.description}</em>
      <a href={props.best_fare.deeplink} className="btn" target="_BLANK">
        <span>SELECT</span>
      </a>
      <a href="#">+ more details</a>
    </div>
  </article>
)
