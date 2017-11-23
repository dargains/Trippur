import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import api from "../api";

var CancelToken = Axios.CancelToken;
var cancel;

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "flights",
      chosenHotel:{},
      chosenFlight:{},
      hotels: [],
      flights: []
    }
    this.onTypeChange = this.onTypeChange.bind(this);
    this.getHotels = this.getHotels.bind(this);
    this.chooseHotel = this.chooseHotel.bind(this);
  }
  onTypeChange(event) {
    let type = event.target.dataset.type;
    this.props.handleChangeType(type)
    this.setState({
      type,
      hotels:[],
      chosenHotel:{},
      chosenFlight:{},
      flights:[]
    });
  }
  getInboundAirports() {

  }
  getOutboundAirports() {

  }
  getHotels(event) {
    var that = this;
    if (cancel != undefined) cancel();
    Axios.get(api.getLocations, {
      params: {
        q: that.refs.hotelFrom.value,
        lang: "EN",
        currency_code: "USD"
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      crossdomain: true
    })
    .then(function (response) {
      that.setState({hotels: response.data.locations});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  chooseHotel(event) {
    var that = this;
    const hotel = event.target.dataset,
          chosenHotel = {
            id: hotel.hotelid,
            country_name: hotel.countryname,
            country_code: hotel.countrycode
          };
    this.setState({chosenHotel})

  }
  render() {
    const that = this;
    const hotelFromList = this.state.hotels.length && this.state.hotels.map(hotel => <li key={hotel.id} data-hotelid={hotel.id} data-countrycode={hotel.country_code} data-countryname={hotel.country_name} onClick={that.chooseHotel}>{hotel.name}</li>)
    return (
      <div className="searchbar">
        <ul className="searchbar__types">
          <li onClick={this.onTypeChange} data-type="flights" className={this.state.type === "flights" ? "active" : ""}>Flights</li>
          <li onClick={this.onTypeChange} data-type="hotels" className={this.state.type === "hotels" ? "active" : ""}>Hotels</li>
        </ul>
        {
          this.state.type === "flights"
           ? (
             <div className="searchbar__filters">
               <input type="text" placeholder="From" ref="flightFrom"/>
               <input type="text" placeholder="Where to" ref="flightTo"/>
               <input type="text" placeholder="insert datepicker" ref="flightDate"/>
               <input type="text" placeholder="insert personpicker" ref="flightPeople"/>
               <Link to="/results" className="btn primary">
                 <span>Search</span>
               </Link>
             </div>
           ) : (
             <div className="searchbar__filters">
               <div className="searchbar__container">
                 <input type="text" placeholder="Where do you want to go?" onKeyUp={this.getHotels} ref="hotelFrom"/>
                 <ul className="searchbar__results">{hotelFromList}</ul>
               </div>
               <input type="text" placeholder="insert datepicker" ref="hotelDate"/>
               <input type="text" placeholder="insert personpicker" ref="hotelPeople"/>
               <Link to='/results' className="btn primary">
                 <span>Search</span>
               </Link>
             </div>
           )
        }
      </div>
    )
  }
}

export default Searchbar;
