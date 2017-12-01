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

    // const flightItems = this.props.flights.map(flight =>
    //   <HotelItem key={flight.id} {...flight}/>
    // );
    const hotelItems = this.props.hotels.map(hotel =>
      <HotelItem key={hotel.id} {...hotel}/>
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
