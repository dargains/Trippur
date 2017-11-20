import React from 'react';

import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";

function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}

const styles = {
  checked: {
    color: "#FF5722",
  },
};

class FlightFilters extends React.Component {
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
      <div>
        <div>
          <h2 className="sidebar__legend">Price</h2>
          <InputRange
            maxValue={500}
            minValue={100}
            formatLabel={value => `${value}€`}
            value={this.state.price}
            onChange={price => this.setState({ price })}
            onChangeComplete={value => console.log(value)} />
        </div>
        <hr />
        <div>
          <h2 className="sidebar__legend">Stops</h2>
        </div>
        <hr />
        <div>
          <h2 className="sidebar__legend">Times</h2>
          <p className="flightLegend">Inbound - <span>LIS</span></p>
          <InputRange
            maxValue={1440}
            minValue={0}
            formatLabel={value => `${pad(Math.floor(value/60))}:${pad(value%60)}`}
            value={this.state.inbound}
            onChange={inbound => this.setState({ inbound })}
            onChangeComplete={value => console.log(value)} />
          <p className="flightLegend">Outbound - <span>LON</span></p>
          <InputRange
            maxValue={1440}
            minValue={0}
            formatLabel={value => `${pad(Math.floor(value/60))}:${pad(value%60)}`}
            value={this.state.outbound}
            onChange={outbound => this.setState({ outbound })}
            onChangeComplete={value => console.log(value)} />
          </div>
          <hr />
          <div>
            <h2 className="sidebar__legend">Cabin</h2>

          </div>
          <hr />
          <div>
            <h2 className="sidebar__legend">Airlines</h2>
          </div>
      </div>
    );
  }
}

//export default Sidebar;
export default FlightFilters;
