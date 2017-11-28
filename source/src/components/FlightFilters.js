import React from 'react';

import InputRange from 'react-input-range';

function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}

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
    };
  }
  render() {
    return (
      <div>
        <article>
          <h2 className="sidebar__legend">Price</h2>
          <InputRange
            maxValue={500}
            minValue={100}
            formatLabel={value => `${value}€`}
            value={this.state.price}
            onChange={price => this.setState({ price })}
            onChangeComplete={value => console.log(value)} />
        </article>
        <hr />
        <article>
          <h2 className="sidebar__legend">Stops</h2>
          <div className="checkField">
            <input type="checkbox" name="stops" id="stop1" />
            <label htmlFor="stop1">No stops</label>
          </div>
          <div className="checkField">
            <input type="checkbox" name="stops" id="stop2" />
            <label htmlFor="stop2">1 stop</label>
          </div>
          <div className="checkField">
            <input type="checkbox" name="stops" id="stop3" />
            <label htmlFor="stop3">+2 stops</label>
          </div>
        </article>
        <hr />
        <article>
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
          </article>
          <hr />
          <article>
            <h2 className="sidebar__legend">Cabin</h2>
            <div className="checkField">
              <input type="checkbox" name="cabin" id="cabin1" />
              <label htmlFor="cabin1">Economy</label>
            </div>
            <div className="checkField half">
              <input type="checkbox" name="cabin" id="cabin2" />
              <label htmlFor="cabin2">Business</label>
            </div>
            <div className="checkField">
              <input type="checkbox" name="cabin" id="cabin3" />
              <label htmlFor="cabin3">First class</label>
            </div>
          </article>
          <hr />
          <article>
            <h2 className="sidebar__legend">Airlines</h2>
          </article>
      </div>
    );
  }
}

//export default Sidebar;
export default FlightFilters;
