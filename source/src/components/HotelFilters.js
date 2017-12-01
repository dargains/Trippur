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
      stars: [
        {
          name: "stars",
          label: "five stars"
        }, {
          name: "stars",
          label: "four stars"
        }, {
          name: "stars",
          label: "three stars"
        }
      ]
    };
    this.checkboxClick = this.checkboxClick.bind(this);
  }
  componentWillMount() {
    this.getAmenities();
    this.getDistricts();
    this.getRooms();
  }
  getAmenities() {
    let rawAmenities = [];
    this.props.hotels.map(hotel => {
      hotel.room_rates.forEach(room => {
        for(let amenity in room.amenities[""]) {
          rawAmenities.push({name:amenity, label:room.amenities[""][amenity]});
        }
      });
    });
    const amenities = Array.from(new Set(rawAmenities.map(JSON.stringify))).map(JSON.parse);
    this.setState({amenities});
  }
  getDistricts() {
    let rawDistricts = [];
    this.props.districts.map(district => rawDistricts.push({name: district.id, label: district.name}));
    let districts = Array.from(new Set(rawDistricts.map(JSON.stringify))).map(JSON.parse);
    this.setState({districts});
  }
  getRooms() {
    let rawRooms = [];
    this.props.hotels.map(hotel => {
      hotel.room_rates.forEach(room => {
        rawRooms.push(room.description);
      });
    });
    let rooms = [...new Set(rawRooms)];
    this.setState({rooms})
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
          <h2 className="sidebar__legend">Star Rating</h2>
          {this.state.stars.map((checkbox,index) => <Checkbox key={`star${index}`} id={`star${index}`} name={checkbox.name} label={checkbox.label} handleClick={this.checkboxClick}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">Accomodation Type</h2>
          {this.state.rooms.map((checkbox,index) => <Checkbox key={`room${index}`} id={`room${index}`} name={checkbox} label={checkbox} handleClick={this.checkboxClick}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">District Areas</h2>
          {this.state.districts.map((checkbox,index) => <Checkbox key={`district${index}`} id={`district${index}`} name={checkbox.name} label={checkbox.label} handleClick={this.checkboxClick}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">Hotel Amenities</h2>
          {this.state.amenities.map((checkbox,index) => <Checkbox key={`amenity${index}`} id={`amenity${index}`} name={checkbox.name} label={checkbox.label} handleClick={this.checkboxClick}/>)}
        </article>
      </div>
    );
  }
}

export default HotelFilters;
