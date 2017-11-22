import React from 'react';

import InputRange from 'react-input-range';
import Checkbox from './Checkbox';

function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}

class HotelFilters extends React.Component {
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
      stops: [
        {
          id: "stop0",
          name: "stops",
          label: "No stops"
        }, {
          id: "stop1",
          name: "stops",
          label: "1 stop"
        }, {
          id: "stop2",
          name: "stops",
          label: "+2 stops"
        }
      ],
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
  checkboxClick(event) {
    console.log(event.target)
  }
  render() {
    return (
      <div>
        <article>
          <h2 className="sidebar__legend">Hotel Name</h2>
        </article>
        <hr />
        <article>
          <h2 className="sidebar__legend">Price</h2>
          <InputRange
            maxValue={500}
            minValue={100}
            formatLabel={value => `${value}€`}
            value={this.state.price}
            onChange={price => this.setState({price})}
            onChangeComplete={value => console.log(value)}
          />
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">Stops</h2>
          {this.state.stops.map(checkbox => <Checkbox key={checkbox.id} id={checkbox.id} name={checkbox.name} label={checkbox.label} handleClick={this.checkboxClick}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">Times</h2>
          <p className="flightLegend">Inbound - <span>LIS</span></p>
          <InputRange
            maxValue={1440}
            minValue={0}
            formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`}
            value={this.state.inbound}
            onChange={inbound => this.setState({inbound})}
            onChangeComplete={value => console.log(value)}
          />
          <p className="flightLegend">Outbound - <span>LON</span></p>
          <InputRange maxValue={1440} minValue={0} formatLabel={value => `${pad(Math.floor(value / 60))}:${pad(value % 60)}`} value={this.state.outbound} onChange={outbound => this.setState({outbound})} onChangeComplete={value => console.log(value)}/>
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">Cabin</h2>
          {this.state.cabin.map(checkbox => <Checkbox key={checkbox.id} id={checkbox.id} name={checkbox.name} label={checkbox.label} handleClick={this.checkboxClick}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">Airlines</h2>
        </article>
      </div>
    );
  }
}

//export default Sidebar;
export default HotelFilters;
