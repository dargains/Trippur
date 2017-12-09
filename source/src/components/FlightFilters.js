import React from 'react';

import lang from "../lang";

import Checkbox from "./Checkbox";
import InputRange from 'react-input-range';

const pad = n => n < 10 ? "0" + n : n;
function thereIs(value,array) {
  if (typeof(array) === "string") return value === array;
  else return array.find(element => element === value);
}

class FlightFilters extends React.Component {
  constructor(props) {
    super(props);
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
    const filterLang = lang[this.props.lang].Filterbar.flights;
    return (
      <div>

        <article>
          <h2 className="sidebar__legend">{filterLang.price}</h2>
          <InputRange
            maxValue={this.state.initialPrice.max}
            minValue={this.state.initialPrice.min}
            formatLabel={value => `${this.props.actualCurrencySymbol}${value}`}
            value={this.state.price}
            onChange={price => this.setState({price})}
            onChangeComplete={value => this.props.changePrice(value)}
          />
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.stops}</h2>
          {this.props.flights.stop_type_filters.map(stop => <Checkbox key={stop.code} id={stop.code} name={stop.code} label={stop.name} checked={thereIs(stop.code,this.props.stop_types)} handleClick={this.props.changeStops}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.times}</h2>
          <p className="flightLegend">{filterLang.departure}</p>
          <InputRange
            maxValue={this.props.flights.departure_day_time_filter.max}
            minValue={this.props.flights.departure_day_time_filter.min}
            formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`}
            value={this.state.inbound}
            onChange={inbound => this.setState({inbound})}
            onChangeComplete={value => this.props.changeInboudTime(value)}
          />
          <p className="flightLegend">{filterLang.duration}</p>
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
          <h2 className="sidebar__legend">{filterLang.cabin}</h2>
          <Checkbox id="economy" name="economy" label={filterLang.cabins[0]} checked={thereIs("economy",this.props.cabin)} handleClick={this.props.changeStops} />
          <Checkbox id="business" name="business" label={filterLang.cabins[1]} checked={thereIs("business",this.props.cabin)} handleClick={this.props.changeStops} />
          <Checkbox id="first" name="first" label={filterLang.cabins[2]} checked={thereIs("first",this.props.cabin)} handleClick={this.props.changeStops} />
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.airlines}</h2>
          {this.props.flights.airline_filters.map(airline => <Checkbox key={airline.code} id={airline.code} name={airline.code} label={airline.name} checked={thereIs(airline.code,this.props.airline_codes)} handleClick={this.props.changeAirlines}/>)}
        </article>

      </div>
    );
  }
}

//export default Sidebar;
export default FlightFilters;
