import React from 'react';

import Checkbox from './Checkbox';
import Stars from './Stars';
import InputRange from 'react-input-range';

import lang from "../lang";

const thereIs = (value,array) => array.find(element => element === value);
const compare = (a,b) =>  a.code > b.code ? -1 : a.code < b.code ? 1 : 0;

class HotelFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelName: "",
      initialPrice: {
        min:props.initialPriceMin,
        max:props.initialPriceMax
      },
      price: {
        min:props.priceMin,
        max:props.priceMax
      },
      stars: [],
      districts: [],
      propTypes: [],
      amenities: [],
      firstLoad:true
    };
    this.changelHotelName = this.changelHotelName.bind(this);
  }
  componentWillMount() {
    this.updateValues(this.props);
    this.setState({
      price:this.state.initialPrice
    });
  }
  componentWillReceiveProps(props) {
    if (!this.props.gotRates) return;
    this.updateValues(props);
    this.setState({firstLoad:false});
  }
  updateValues(props) {
    this.getPrices(props);
    this.getDistricts(props);
    this.getPropType(props);
    this.getAmenities(props);
    this.getStars(props);
  }
  getPrices(props) {
    if (!props.gotRates) return;
    let initialPrice = {
      min: props.initialPriceMin,
      max: props.initialPriceMax
    }
    if(this.state.firstLoad) this.setState({price:initialPrice});
    this.setState({initialPrice});
  }
  getStars(props) {
    if (!props.gotRates) return;
    const stars = props.info.filter.stars;
    stars.sort(compare)
    this.setState({stars});
  }
  getDistricts(props) {
    if (!props.gotRates) return;
    const filterDistricts = props.info.filter.districts;
    const allDistricts = props.info.districts;
    filterDistricts.map(item => item.id = parseInt(item.code,10)); //both heve id as int;

    //merge both arrays into districts by the id
    var hash = {};
    allDistricts.concat(filterDistricts).forEach(obj => {
        hash[obj.id] = Object.assign(hash[obj.id] || {}, obj);
    });
    var districts = Object.keys(hash).map(key => hash[key]);
    this.setState({districts});
  }
  getPropType(props) {
    if (!props.gotRates) return;
    const filterPropTypes = props.info.filter.propertyTypes;
    const allPropTypes = props.info.propertyTypes;
    filterPropTypes.map(item => item.id = parseInt(item.code,10)); //both heve id as int;

    //merge both arrays into propTypes by the id
    var hash = {};
    allPropTypes.concat(filterPropTypes).forEach(obj => {
        hash[obj.id] = Object.assign(hash[obj.id] || {}, obj);
    });
    var propTypes = Object.keys(hash).map(key => hash[key]);
    this.setState({propTypes});
  }
  getAmenities(props) {
    if (!props.gotRates) return;
    const filterAmenities = props.info.filter.amenities;
    const allAmenities = props.info.amenities;
    filterAmenities.map(item => item.id = parseInt(item.code,10)); //both heve id as int;

    //merge both arrays into propTypes by the id
    var hash = {};
    allAmenities.concat(filterAmenities).forEach(obj => {
        hash[obj.id] = Object.assign(hash[obj.id] || {}, obj);
    });
    var amenities = Object.keys(hash).map(key => hash[key]);
    this.setState({amenities});
  }
  changelHotelName(event) {
    this.props.changeName(event.target.value);
  }
  render() {
    const filterLang = lang[this.props.lang].Filterbar.hotels;
    const currencySymbol = lang[this.props.lang].Currency[this.props.currency].symbol;
    return (
    <div>

        <article>
          <h2 className="sidebar__legend">{filterLang.name}</h2>
          <input type="text" ref="hotelName" aria-label="Hotel name" value={this.props.hotelName} onChange={this.changelHotelName}/>
          <i className="icon-filter" onClick={this.props.changeName}></i>
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.price}</h2>
          <InputRange
            maxValue={this.state.initialPrice.max}
            minValue={this.state.initialPrice.min}
            formatLabel={value => `${currencySymbol}${value}`}
            value={this.state.price}
            onChange={price => this.setState({price})}
            onChangeComplete={value => this.props.changePrice(value)}
          />
        </article>

        <article>
          <h2 className="sidebar__legend">{filterLang.star}</h2>
          {this.state.stars.map((star,index) => <Checkbox key={`star${index}`} id={`star${index}`} name={star.code} label={<Stars stars={star} />} checked={thereIs(star.code,this.props.stars)} handleClick={this.props.changeStar}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.type}</h2>
          {this.state.propTypes.map((propType,index) => <Checkbox key={`prop${index}`} id={`prop${index}`} name={propType.code} label={propType.name} checked={thereIs(propType.code,this.props.propertyTypes)} handleClick={this.props.changePropType}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.district}</h2>
          {this.state.districts.map((district,index) => <Checkbox key={`district${index}`} id={`district${index}`} name={district.code} label={district.name} checked={thereIs(district.name,this.props.districts)} handleClick={this.props.changeDistrict}/>)}
        </article>

        <hr/>

        <article>
          <h2 className="sidebar__legend">{filterLang.amenities}</h2>
          {this.state.amenities.map((amenities,index) => <Checkbox key={`amenities${index}`} id={`amenities${index}`} name={amenities.code} label={amenities.name} checked={thereIs(amenities.name,this.props.amenities)} handleClick={this.props.changeAmenities}/>)}
        </article>

      </div>


    );
  }
}

export default HotelFilters;
