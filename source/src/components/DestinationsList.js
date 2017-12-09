import React from 'react';

import Destination from "./Destination";
import lang from "../lang";

class DestinationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [
        {caption: "Lisbon", image: "http://trippur.azurewebsites.net/images/destinations/portugal.png", link: ""},
        {caption: "Amsterdam", image: "http://trippur.azurewebsites.net/images/destinations/netherlands.png", link: ""},
        {caption: "Barcelona", image: "http://trippur.azurewebsites.net/images/destinations/Spain.png", link: ""},
        {caption: "Roma", image: "https://www.didikrepinsky.com/wp-content/uploads/2017/06/shutterstock_555416503.jpg", link: ""},
        {caption: "Ibiza", image: "https://images.trvl-media.com/hotels/13000000/12950000/12945100/12945048/12945048_8_z.jpg", link: ""},
        {caption: "Paris", image: "https://thesightseeingcoeliacdotblog.files.wordpress.com/2017/01/img_2857.jpg?w=1000", link: ""},
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
