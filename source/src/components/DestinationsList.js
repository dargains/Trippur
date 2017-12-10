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
      destinations: [
        {caption: "Bangkok", image: bangkok, link: ""},
        {caption: "Dubai", image: Dubai, link: ""},
        {caption: "New York", image: NewYork, link: ""},
        {caption: "Paris", image: Paris, link: ""},
        {caption: "Singapore", image: Singapore, link: ""},
        {caption: "Venice", image: Venice, link: ""},
      ]
    };
  }
  render() {
    const destinations = this.state.destinations.map(destination => <Destination key={destination.caption} {...destination} />)
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
