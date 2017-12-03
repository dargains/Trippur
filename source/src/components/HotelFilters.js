import React from 'react';

import Checkbox from './Checkbox';

class HotelFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.checkboxClick = this.checkboxClick.bind(this);
  }
  componentWillMount() {
    this.getStars();
    this.getAmenities();
    this.getDistricts();
    this.getPropType();
  }
  getStars() {
    let rawStars = [];
    this.props.hotels.forEach(hotel => rawStars.push(hotel.stars));
    let stars = [...new Set(rawStars)].sort().reverse();
    this.setState({stars});
  }
  getAmenities() {
    let rawAmenities = [];
    this.props.hotels.forEach(hotel => {
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
  getPropType() {
    let rawProp = [];
    this.props.hotels.forEach(hotel => rawProp.push(hotel.property_type));
    let propTypes = [...new Set(rawProp)];
    this.setState({propTypes});
  }
  checkboxClick(event) {
    console.log(event.target)
  }
  render() {
    const proptypes = ["Hotel","Hostel","Bed and Breakfast","Apartment","Resort","Villa","Motel"];
    const stars = ["Not specified","One star","Two stars","Three stars","Four stars","Five stars"];
    return (
      <div>
        <article>
          <h2 className="sidebar__legend">Star Rating</h2>
          {this.state.stars.map((checkbox,index) => <Checkbox key={`star${index}`} id={`star${index}`} name={checkbox} label={stars[checkbox]} handleClick={this.props.changeStar}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">Accomodation Type</h2>
          {this.state.propTypes.map((checkbox,index) => <Checkbox key={`prop${index}`} id={`prop${index}`} name={checkbox} label={proptypes[checkbox]} handleClick={this.props.changePropType}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">District Areas</h2>
          {this.state.districts.map((checkbox,index) => <Checkbox key={`district${index}`} id={`district${index}`} name={checkbox.name} label={checkbox.label} handleClick={this.props.changeDistrict}/>)}
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
