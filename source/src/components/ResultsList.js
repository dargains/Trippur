import React from 'react';
import FlightItem from './FlightItem';
import HotelItem from './HotelItem';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    let items;
    this.props.type === "flights"
      ? items = this.props.routes.map(flight => <FlightItem key={flight.id} {...flight}/> )
      : items = this.props.hotels.map(hotel => <HotelItem key={hotel.id} {...hotel}/> );
    return (
      <section className="resultsList">
        {items}
      </section>
    );
  }
}

export default ResultsList;
