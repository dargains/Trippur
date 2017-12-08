import React from 'react';

import Checkbox from "./Checkbox";
import InputRange from 'react-input-range';

const pad = n => n < 10 ? "0" + n : n;
const thereIs = (value,array) => array.find(element => element == value);

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
    let flights = this.props.flights;
    let initialPrice = {
      min: flights.price_filter.min,
      max: flights.price_filter.max
    }
    this.setState({
      initialPrice,
      price: initialPrice,
      inbound: {
        min: flights.departure_day_time_filter.min,
        max: flights.departure_day_time_filter.max
      },
      duration: {
        min: flights.duration_filter.min,
        max: flights.duration_filter.max
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
            maxValue={this.state.initialPrice.max}
            minValue={this.state.initialPrice.min}
            formatLabel={value => `${value}${this.props.actualCurrencySymbol}`}
            value={this.state.price}
            onChange={price => this.setState({price})}
            onChangeComplete={value => this.props.changePrice(value)}
          />
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">Stops</h2>
          {this.props.flights.stop_type_filters.map(stop => <Checkbox key={stop.code} id={stop.code} name={stop.code} label={stop.name} checked={thereIs(stop.code,this.props.stop_types)} handleClick={this.props.changeStops}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">Times</h2>
          <p className="flightLegend">Departure time</p>
          <InputRange
            maxValue={this.props.flights.departure_day_time_filter.max}
            minValue={this.props.flights.departure_day_time_filter.min}
            formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`}
            value={this.state.inbound}
            onChange={inbound => this.setState({inbound})}
            onChangeComplete={value => this.props.changeInboudTime(value)}
          />
          <p className="flightLegend">Duration</p>
          <InputRange
            maxValue={this.props.flights.duration_filter.max}
            minValue={this.props.flights.duration_filter.min}
            formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`}
            value={this.state.duration}
            onChange={duration => this.setState({duration})}
            onChangeComplete={value => this.props.changeDuration(value)}
          />
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">Cabin</h2>
          {this.state.cabin.map(cabin => <Checkbox key={cabin.id} id={cabin.id} name={cabin.name} label={cabin.label} checked={thereIs(cabin.id,this.props.cabin)} handleClick={this.props.changeStops} />)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">Airlines</h2>
          {this.props.flights.airline_filters.map(airline => <Checkbox key={airline.code} id={airline.code} name={airline.code} label={airline.name} checked={thereIs(airline.code,this.props.airline_codes)} handleClick={this.props.changeAirlines}/>)}
        </article>

      </div>
    );
  }
}

//export default Sidebar;
export default FlightFilters;
