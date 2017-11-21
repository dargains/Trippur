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
        <HotelFilters />
      </aside>
    );
  }
}

//export default Sidebar;
export default Sidebar;
