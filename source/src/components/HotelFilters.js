import React from 'react';

import Checkbox from './Checkbox';
import Stars from './Stars';
import InputRange from 'react-input-range';

import lang from "../lang";

const thereIs = (value,array) => array.find(element => element === value);

class HotelFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotRates: false,
      hotelName: "",
      initialPrice: {
        min: 0,
        max: 10
      },
      price: {
        min: 0,
        max: 10
      },
      stars: [],
      districts: [],
      propTypes: []
    };
    this.changelHotelName = this.changelHotelName.bind(this);
  }
  componentDidUpdate() {
    if (this.state.gotRates) return;
    this.props.rates && this.setState({gotRates:true});
    this.getPrices();
    this.getStars();
    this.getDistricts();
    this.getPropType();
  }
  getPrices() {
    if (this.props.rates === undefined) return;
    const filter = this.props.info.filter;
    const initialPrice = {
      min: filter.minPrice.amount,
      max: filter.maxPrice.amount
    }
    this.setState({
      initialPrice,
      price:initialPrice
    });
  }
  getStars() {
    if (this.props.rates === undefined) return;
    const stars = this.props.info.filter.stars.reverse();
    this.setState({stars});
  }
  getDistricts() {
    if (this.props.rates === undefined) return;
    const filterDistricts = this.props.info.filter.districts;
    const allDistricts = this.props.info.districts;
    filterDistricts.map(item => item.id = parseInt(item.code,10)); //both heve id as int;

    //merge both arrays into districts by the id
    var hash = {};
    allDistricts.concat(filterDistricts).forEach(obj => {
        hash[obj.id] = Object.assign(hash[obj.id] || {}, obj);
    });
    var districts = Object.keys(hash).map(key => hash[key]);
    this.setState({districts});
  }
  getPropType() {
    if (this.props.rates === undefined) return;
    const filterPropTypes = this.props.info.filter.propertyTypes;
    const allPropTypes = this.props.info.propertyTypes;
    filterPropTypes.map(item => item.id = parseInt(item.code,10)); //both heve id as int;

    //merge both arrays into propTypes by the id
    var hash = {};
    allPropTypes.concat(filterPropTypes).forEach(obj => {
        hash[obj.id] = Object.assign(hash[obj.id] || {}, obj);
    });
    var propTypes = Object.keys(hash).map(key => hash[key]);
    this.setState({propTypes});
  }
  changelHotelName(event) {
    if (event.key === 'Enter') this.props.changeName(this.refs.hotelName.value);
  }
  render() {
    const filterLang = lang[this.props.lang].Filterbar.hotels;


    return (
    <div>

        <article>
          <h2 className="sidebar__legend">{filterLang.name}</h2>
          <input type="text" ref="hotelName" aria-label="Hotel name" onKeyPress={this.changelHotelName}/>
          <i className="icon-filter" onClick={this.props.changeName}></i>
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.price}</h2>
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
          <h2 className="sidebar__legend">{filterLang.star}</h2>
          {this.state.stars.map((star,index) => <Checkbox key={`star${index}`} id={`star${index}`} name={star.code} label={<Stars stars={star} />} checked={thereIs(star,this.props.stars)} handleClick={this.props.changeStar}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.type}</h2>
          {this.state.propTypes.map((propType,index) => <Checkbox key={`prop${index}`} id={`prop${index}`} name={propType.name} label={`${propType.name} (${propType.count})`} checked={thereIs(propType,this.props.propertyTypes)} handleClick={this.props.changePropType}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.district}</h2>
          {this.state.districts.map((district,index) => <Checkbox key={`district${index}`} id={`district${index}`} name={district.name} label={`${district.name} (${district.count})`} checked={thereIs(district.name,this.props.districts)} handleClick={this.props.changeDistrict}/>)}
        </article>

      </div>


    );
  }
}

export default HotelFilters;
