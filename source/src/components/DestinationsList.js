import React from 'react';

import Destination from "./Destination";
import lang from "../lang";

import bangkok from "../images/Bangkok.jpg";
import Dubai from "../images/Dubai.jpg";
import NewYork from "../images/NewYork.jpg";
import Paris from "../images/Paris.jpg";
import Singapore from "../images/Singapore.jpg";
import Venice from "../images/Venice.jpg";

class DestinationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      scrollStepInPx: 40,
      delayInMs: 20,
      destinations: [
        {caption: "Bangkok", image: bangkok, link: ""},
        {caption: "Dubai", image: Dubai, link: ""},
        {caption: "New York", image: NewYork, link: ""},
        {caption: "Paris", image: Paris, link: ""},
        {caption: "Singapore", image: Singapore, link: ""},
        {caption: "Venice", image: Venice, link: ""},
      ]
    };
    this.selectDestination = this.selectDestination.bind(this);
  }
  scrollStep() {
    if (window.pageYOffset === 0) clearInterval(this.state.intervalId);
    window.scroll(0, window.pageYOffset - this.state.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.state.delayInMs);
    this.setState({ intervalId: intervalId });
  }
  selectDestination(event) {
    const destination = event.currentTarget.dataset.destination;
    const flight = document.querySelector("#outboundAirport");
    const hotel = document.querySelector("#hotelDestination");
    this.scrollToTop();
    flight
      ? flight.value = destination
      : hotel.value = destination
  }
  render() {
    const destinations = this.state.destinations.map(destination => <Destination key={destination.caption} {...destination} handleClick={this.selectDestination}/>)
    return (
      <section className="destinations" data-margin-top="80" data-margin-bottom="80">
        <div className="wrapper">
          <h2>{lang[this.props.lang].Destinations.title}</h2>
          <div className="photoGrid">
            <ul>
              {destinations}
            </ul>
          </div>
          {/* <a href="" className="btn">
            <span>see more</span>
          </a> */}
        </div>
      </section>
    )
  }
}

export default DestinationsList;
