import React, { Component } from 'react';
import moment from "moment";
import lang from "../lang";


const getTimeDiff = (start,end) => {
  const departure = moment.utc(start);
  const arrival = moment.utc(end);
  if (arrival.isBefore(departure)) arrival.add(1, 'day');
  const d = moment.duration(arrival.diff(departure));
  return moment.utc(+d).format('HH:mm');

}

class FlightItem extends Component {
  goToLink(event) {
    let select = event.target,
        selectedIndex = select.selectedIndex;
    if (selectedIndex) window.location.href = select.childNodes[selectedIndex].dataset.link;
  }
  render() {
    const itemLang = lang[this.props.lang].Item.flights;
    const stops = itemLang.stops;
    return (
      <article className="flightItem">
        <div className="price">
          <p>{this.props.currency}{this.props.best_fare.price}<span>{this.props.best_fare.provider_name}</span></p>
        </div>
        <ul className="flightLogo">
          {this.props.outbound_segments.map(route => <li className="company" key={route.designator_code} style={{backgroundImage: `url(http://0.omg.io/wego/image/upload/c_fit,w_200,h_70/flights/airlines_rectangular/${route.airline_code}.png)`}} alt={route.airline_name} />)}
        </ul>
        <div className="flightInfo">
          {this.props.outbound_segments.map(route => <p key={route.designator_code} className="companyName">{route.airline_name}</p>)}
          <ul>
            {this.props.outbound_segments.map(route =>
              <li key={route.designator_code}>
                <p><strong>{moment(route.departure_time).format("H[h]mm[m]")}</strong> {route.departure_name}</p>
                <p>
                  <span>{getTimeDiff(route.departure_time,route.arrival_time)}</span>
                </p>
                <p><strong>{moment(route.arrival_time).format("H[h]mm[m]")}</strong> {route.arrival_name}</p>
              </li>
            )}
            <span className="flightDuration">{this.props.outbound_segments.length > 2 ? stops[2] : stops[this.props.outbound_segments.length - 1]}</span>
          </ul>
          {
            this.props.inbound_segments &&
            <ul>
              {this.props.inbound_segments.map(route =>
                <li key={route.designator_code}>
                  <p><strong>{moment(route.departure_time).format("H[h]mm[m]")}</strong> {route.departure_name}</p>
                  <p>
                    <span>{getTimeDiff(route.departure_time,route.arrival_time)}</span>
                  </p>
                  <p><strong>{moment(route.arrival_time).format("H[h]mm[m]")}</strong> {route.arrival_name}</p>
                </li>
              )}
              <span className="flightDuration">{this.props.inbound_segments.length > 2 ? stops[2] : stops[this.props.inbound_segments.length - 1]}</span>
            </ul>
          }
        </div>
        <div className="flightType">
          <em>{this.props.best_fare.description}</em>
          <a href={this.props.best_fare.deeplink} className="btn primary" target="_BLANK">
            <span>{itemLang.select}</span>
          </a>
          <select onChange={this.goToLink}>
            <option>Other providers</option>
            {this.props.fares.map(fare => <option key={fare.deeplink} data-link={fare.deeplink}>{fare.provider_name} {this.props.currency}{fare.price}</option>)}
          </select>
        </div>
      </article>
    )
  }
}

export default FlightItem;
