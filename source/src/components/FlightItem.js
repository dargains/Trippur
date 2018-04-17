import React, { Component } from 'react';
import moment from "moment";
import lang from "../lang";

class FlightItem extends Component {
  goToLink(event) {
    let select = event.target,
        selectedIndex = select.selectedIndex;
    if (selectedIndex) window.open(select.childNodes[selectedIndex].dataset.link);
  }
  render() {
    const props = this.props;
    const currencySymbol = lang[props.lang].Currency[props.currency].symbol;
    const itemLang = lang[props.lang].Item.flights;
    const stops = itemLang.stops;
    const routesElement = props.legs.map((leg,j) =>
      <ul key={j}>
        {leg.segments.map((segment,i) =>
          <li key={i}>
            <p><strong>{i === 0 ? leg.departureTime : moment.utc((leg.segments[i-1].durationMinutes + leg.segments[i-1].stopoverDurationMinutes + leg.departureTimeMinutes)*6e4).format("HH:mm")}</strong>
              {props.info.cities.find(city => city.code === props.info.airports.find(airport => airport.code === segment.departureAirportCode).cityCode).name}
            </p>
            <p>
              <span>{moment.utc(segment.durationMinutes*6e4).format("HH:mm")}</span>
            </p>
            <p><strong>{i === leg.segments.length - 1 ? leg.arrivalTime : moment.utc((segment.durationMinutes + leg.departureTimeMinutes)*6e4).format("HH:mm")}</strong>
              {props.info.cities.find(city => city.code === props.info.airports.find(airport => airport.code === segment.arrivalAirportCode).cityCode).name}
            </p>
          </li>
        )}
        <span className="flightDuration">{leg.segments.length > 2 ? stops[2] : stops[leg.segments.length - 1]}</span>
      </ul>
    );

    return (
      <article className="flightItem">
        <div className="price">
          <p>{currencySymbol}{props.bestPrice}<span>{props.bestFare.providerCode}</span></p>
        </div>
        <ul className="flightLogo">
          {
            props.legs.map(leg =>
                leg.airlineCodes.map((airline,i) => <li className="company" key={i} style={{backgroundImage: `url(http://0.omg.io/wego/image/upload/c_fit,w_200,h_70/flights/airlines_rectangular/${airline}.png)`}} alt={airline} />)
            )
          }
        </ul>
        <div className="flightInfo">
          {
            props.legs.map((leg,i) => <p key={i} className="companyName">{props.info.airlines.find(airline => airline.code === leg.segments[0].airlineCode).name}</p>)
          }
          {routesElement}
        </div>
        <div className="flightType">
          <em>{props.legs[0].segments[0].cabin}</em>
          <a href={props.bestFare.handoffUrl} className="btn primary" target="_BLANK">
            <span>{itemLang.select}</span>
          </a>
          <select onChange={this.goToLink}>
            <option>{itemLang.selectProvider}</option>
            {props.fares.map(fare => <option key={fare.id} data-link={fare.handoffUrl}>{fare.providerCode} - {currencySymbol}{fare.price.totalAmount}</option>)}
          </select>
        </div>
      </article>
    )
  }
}

export default FlightItem;
