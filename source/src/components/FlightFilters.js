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
    this.state = {
      airlines: []
    }
    this.checkboxClick = this.checkboxClick.bind(this);
  }
  componentWillMount() {
    const filters = this.props.info.filters;
    let initialPrice = {
      min: filters.minPrice.amount,
      max: filters.maxPrice.amount
    }
    let initialDuration = {
      min: filters.tripDurations.min,
      max: filters.tripDurations.max
    };
    this.setState({
      initialPrice,
      price: initialPrice,
      initialDuration,
      duration: initialDuration,
      stops: filters.stops
    });
    this.getAirlines();
  }
  getAirlines() {
    const info = this.props.info;
    const filters = info.filters;
    let airlines = filters.airlines;
    airlines.forEach(airline => {
      airline.name = info.airlines.find(item => item.code === airline.code).name;
    });
    this.setState({airlines});
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
          <h2 className="sidebar__legend">{filterLang.stop}</h2>
          {this.state.stops.map((stop,i) => <Checkbox key={i} id={stop.code} name={stop.code} label={filterLang.stops[stop.code]} checked={thereIs(stop.code,this.props.stops)} handleClick={this.props.changeStops}/>)}
        </article>

        <hr/>

        <article>
          {/* <h2 className="sidebar__legend">{filterLang.times}</h2> */}
          {/* <p className="flightLegend">{filterLang.departure}</p>
          <InputRange
            maxValue={this.props.flights.departure_day_time_filter.max}
            minValue={this.props.flights.departure_day_time_filter.min}
            formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`}
            value={this.state.inbound}
            onChange={inbound => this.setState({inbound})}
            onChangeComplete={value => this.props.changeInboudTime(value)}
          /> */}
          <h2 className="sidebar__legend">{filterLang.duration}</h2>
          <InputRange
            maxValue={this.state.initialDuration.max}
            minValue={this.state.initialDuration.min}
            formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`}
            value={this.state.duration}
            onChange={duration => this.setState({duration})}
            onChangeComplete={value => this.props.changeDuration(value)}
          />
        </article>

        {/* <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.cabin}</h2>
          <Checkbox id="economy" name="economy" label={filterLang.cabins[0]} checked={thereIs("economy",this.props.cabin)} handleClick={this.props.changeStops} />
          <Checkbox id="business" name="business" label={filterLang.cabins[1]} checked={thereIs("business",this.props.cabin)} handleClick={this.props.changeStops} />
          <Checkbox id="first" name="first" label={filterLang.cabins[2]} checked={thereIs("first",this.props.cabin)} handleClick={this.props.changeStops} />
        </article> */}

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.airlines}</h2>
          {this.state.airlines.map((airline,i) => <Checkbox key={i} id={airline.code} name={airline.code} label={airline.name} checked={thereIs(airline.code,this.props.airlines)} handleClick={this.props.changeAirlines}/>)}
        </article>

      </div>
    );
  }
}

//export default Sidebar;
export default FlightFilters;
