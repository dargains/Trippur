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
      type: "flights"
    }
    this.onTypeChange = this.onTypeChange.bind(this);
    this.getHotels = this.getHotels.bind(this);
  }
  onTypeChange(event) {
    let type = event.target.dataset.type;
    this.props.handleChangeType(type)
    this.setState({type},() => console.log(this.state.type));
  }
  onHotelType() {

  }
  getHotels(event) {
    var that = this;
    let text = this.refs.hotelFrom.value;

    if (cancel != undefined) {
      cancel();
    }

    Axios.get(api.getLocations, {
      params: {
        q: text,
        lang: "EN",
        currency_code: "USD"
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
      crossdomain: true
    })
    .then(function (response) {
      that.setState({hotels: response.data},()=>console.log(that.state.hotels));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
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
               <input type="text" placeholder="Where do you want to go?" onKeyUp={this.getHotels} ref="hotelFrom"/>
               <input type="text" placeholder="insert datepicker" ref="hotelDate"/>
               <input type="text" placeholder="insert personpicker" ref="hotelPeople"/>
               <Link to="/results" className="btn primary">
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
