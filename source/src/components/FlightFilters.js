import React from 'react';

import Checkbox from "./Checkbox";
import InputRange from 'react-input-range';

function pad(n) {
  return (n < 10)
    ? ("0" + n)
    : n;
}

class FlightFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cabin: [
        {
          id: "cabin0",
          name: "cabin",
          label: "Economy"
        }, {
          id: "cabin1",
          name: "cabin",
          label: "Business"
        }, {
          id: "cabin2",
          name: "cabin",
          label: "First class"
        }
      ]
    };
    this.checkboxClick = this.checkboxClick.bind(this);
  }
  componentWillMount() {
    const that = this;
    this.setState({
      price: {
        min:this.props.price_filter.min,
        max:this.props.price_filter.max
      },
      inbound: {
        min:this.props.departure_day_time_filter.min,
        max:this.props.departure_day_time_filter.max
      }
    })
  }
  checkboxClick(event) {
    console.log(event.target)
  }
  render() {
    return (
      <div>

        <article>
          <h2 className="sidebar__legend">Price</h2>
          <InputRange
            maxValue={this.props.price_filter.max}
            minValue={this.props.price_filter.min}
            formatLabel={value => `${value}${this.props.currency.symbol}`}
            value={this.state.price}
            onChange={price => this.setState({price})}
            onChangeComplete={value => this.props.changePrice(value)}
          />
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">Stops</h2>
          {this.props.stop_type_filters.map(stop => <Checkbox key={stop.code} id={stop.code} name={stop.code} label={stop.name} handleClick={this.props.changeStops}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">Times</h2>
          <p className="flightLegend">Origin - <span>{this.props.departure_airport_filters[0].code}</span></p>
          <InputRange
            maxValue={this.props.departure_day_time_filter.max}
            minValue={this.props.departure_day_time_filter.min}
            formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`}
            value={this.state.inbound}
            onChange={inbound => this.setState({inbound})}
            onChangeComplete={value => console.log(value)}
          />
          <p className="flightLegend">Destination - <span>{this.props.arrival_airport_filters[0].code}</span></p>
          {/* <InputRange
            maxValue={this.props.departure_day_time_filter.max}
            minValue={this.props.departure_day_time_filter.min}
            formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`}
            value={this.state.inbound}
            onChange={inbound => this.setState({inbound})}
            onChangeComplete={value => console.log(value)}
          /> */}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">Cabin</h2>
          {this.state.cabin.map(checkbox => <Checkbox key={checkbox.id} id={checkbox.id} name={checkbox.name} label={checkbox.label} handleClick={this.props.changeStops}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">Airlines</h2>
          {this.props.airline_filters.map(airline => <Checkbox key={airline.code} id={airline.code} name={airline.code} label={airline.name} handleClick={this.props.changeAirlines}/>)}
        </article>

      </div>
    );
  }
}

//export default Sidebar;
export default FlightFilters;
