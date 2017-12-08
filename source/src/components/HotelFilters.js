import React from 'react';

import Checkbox from './Checkbox';
import InputRange from 'react-input-range';

const thereIs = (value,array) => array.find(element => element == value);

class HotelFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.checkboxClick = this.checkboxClick.bind(this);
  }
  componentWillMount() {
    this.getPrices();
    this.getStars();
    this.getDistricts();
    this.getPropType();
  }
  getPrices() {
    let initialPrice = {
      min: this.props.hotels.rates.min.price,
      max: this.props.hotels.rates.max.price
    }
    this.setState({initialPrice,price:initialPrice});
  }
  getStars() {
    let rawStars = [];
    this.props.hotels.hotels.forEach(hotel => rawStars.push(hotel.stars));
    let stars = [...new Set(rawStars)].sort().reverse();
    this.setState({stars});
  }
  getDistricts() {
    let rawDistricts = [];
    this.props.hotels.districts.map(district => rawDistricts.push({name: district.id, label: district.name}));
    let districts = Array.from(new Set(rawDistricts.map(JSON.stringify))).map(JSON.parse);
    this.setState({districts});
  }
  getPropType() {
    let rawProp = [];
    this.props.hotels.hotels.forEach(hotel => rawProp.push(hotel.property_type));
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
        <article>
          <h2 className="sidebar__legend">Star Rating</h2>
          {this.state.stars.map((checkbox,index) => <Checkbox key={`star${index}`} id={`star${index}`} name={checkbox} label={stars[checkbox]} checked={thereIs(checkbox,this.props.stars)}handleClick={this.props.changeStar}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">Accomodation Type</h2>
          {this.state.propTypes.map((checkbox,index) => <Checkbox key={`prop${index}`} id={`prop${index}`} name={checkbox} label={proptypes[checkbox]} checked={thereIs(checkbox,this.props.property_types)}handleClick={this.props.changePropType}/>)}
        </article>
        <hr/>
        <article>
          <h2 className="sidebar__legend">District Areas</h2>
          {this.state.districts.map((checkbox,index) => <Checkbox key={`district${index}`} id={`district${index}`} name={checkbox.name} label={checkbox.label} checked={thereIs(checkbox.name,this.props.districts)}handleClick={this.props.changeDistrict}/>)}
        </article>
      </div>
    );
  }
}

export default HotelFilters;
