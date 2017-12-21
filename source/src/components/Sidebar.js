import React from 'react';
import FlightFilters from './FlightFilters';
import HotelFilters from './HotelFilters';

class Sidebar extends React.Component {
  render() {
    return (
      <aside className={this.props.showFilters ? "sidebar shown": "sidebar"}>
        {
          this.props.type === "flights"
            ? <FlightFilters {...this.props}/>
            : <HotelFilters {...this.props}/>
        }
      </aside>
    );
  }
}

export default Sidebar;
