import React from 'react';
import FlightItem from './FlightItem';
import HotelItem from './HotelItem';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    const that = this;
    this.state = {
      hotels: that.props.hotels
    };
  }
  render() {

    // const flightItems = this.props.map((trip, index) =>
    //   <FlightItem key={index} {...trip}/>
    // );
    const hotelItems = Object.keys(this.props).map(key =>
      <HotelItem key={key} {...this.props[key]}/>
    );
    return (
      <section className="resultsList">
        {/* {flightItems} */}
        {hotelItems}
      </section>
    );
  }
}

export default ResultsList;
