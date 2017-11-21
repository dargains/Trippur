import React from 'react';
import FlightFilters from './FlightFilters';
import HotelFilters from './HotelFilters';

function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: {
        min: 150,
        max: 300
      },
      inbound: {
        min: 800,
        max: 1200
      },
      outbound: {
        min: 500,
        max: 700
      },
      nonStop: true,
      oneStop: false,
      twoStops: true,
      economy: false,
      business: true,
      firstClass: true,
    };
  }
  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };
  render() {
    const { classes } = this.props;
    return (
      <aside className="sidebar">
        <FlightFilters />
      </aside>
    );
  }
}

//export default Sidebar;
export default Sidebar;
