import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import api from "../api";
import moment from "moment";

import Calendar from "./Calendar";
import Radiobutton from "./Radiobutton";

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
      flights: [],
      arriveDate:"",
      leaveDate:"",
      selectedOption: '',
      passengers: {
        adults:0,
        children:0,
        babies:0
      },
      cabin:"business",
      showDate:false,
      showPersonPicker:false
    }
    this.onTypeChange = this.onTypeChange.bind(this);
    this.getHotels = this.getHotels.bind(this);
    this.chooseHotel = this.chooseHotel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.closeList = this.closeList.bind(this);
    this.getDate = this.getDate.bind(this);
    this.classSelect = this.classSelect.bind(this);
  }
  onTypeChange(event) {
    let type = event.target.dataset.type;
    this.setState({
      type,
      hotels:[],
      flights:[],
      chosenHotel:{},
      chosenFlight:{},
      arriveDate:"",
      leaveDate:"",
      passengers: {
        adults:0,
        children:0,
        babies:0
      },
      cabin:"business",
      showDate:false,
      showPersonPicker:false
    });
    document.querySelectorAll("input").forEach(input => input.value = "");
  }
  getInboundAirports() {

  }
  getOutboundAirports() {

  }
  getHotels(event) {
    var that = this;
    if (cancel !== undefined) cancel();
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
    this.setState({chosenHotel});
    this.refs.hotelFrom.value = event.target.innerText;
  }
  onSearch(event) {
    const state = this.state;
    const info = this.state.type === "flights"
      ? {
        flightFrom: state.chosenFlight.flightFrom,
        flightTo: state.chosenFlight.flightTo,
        arriveDate: state.arriveDate,
        leaveDate:state.leaveDate,
        people: state.people
      }
      : {
        id: state.chosenHotel.id,
        countryCode: state.chosenHotel.country_code,
        countryName: state.chosenHotel.country_name,
        arriveDate: state.arriveDate,
        leaveDate:state.leaveDate,
        people: state.people
      }
    this.props.sendData(info)
  }
  showList(event) {
    event.target.nextElementSibling.style.display = "block";
  }
  closeList(event) {
    var list = event.target.nextElementSibling;
    setTimeout(() => {
      list.style.display = "none";
    },100)
  }
  showPersonPicker() {
    document.querySelector(".personPicker").style.display = "block";
  }
  getDate(event) {
    if (event.eventType !== 3) return;
    const startDate = moment(event.start).format("D[/]M[/]YYYY");
    const arriveDate = moment(event.start).format("YYYY[/]M[/]D");

    const endDate = moment(event.end).format("D[/]M[/]YYYY");
    const leaveDate = moment(event.end).format("YYYY[/]M[/]D");

    const dateInput = this.state.type === "flights"
      ? this.refs.flightDate
      : this.refs.hotelDate;
    dateInput.value = `${startDate} to ${endDate}`;
    this.setState({
      arriveDate,
      leaveDate
    });
  }
  changePassengers(type, operation) {
    const passengers = this.state.passengers;
    passengers[type] = operation ? this.state.passengers[type]+1 : this.state.passengers[type] <= 0 ? 0 : this.state.passengers[type]-1;
    this.setState({passengers},()=>console.log(this.state.passengers));
  }
  classSelect(event) {
    this.setState({cabin:event.target.id},()=>console.log(this.state));
  }
  render() {
    const that = this;
    const hotelFromList = this.state.hotels.map(hotel => <li key={hotel.id} data-hotelid={hotel.id} data-countrycode={hotel.country_code} data-countryname={hotel.country_name} onClick={that.chooseHotel}>{hotel.name}</li>);

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
               <div className="searchbar__container">
                 <input type="text" placeholder="From" ref="flightFrom"/>
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder="Where to" ref="flightTo"/>
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder="Depart to Return" ref="flightDate" disabled/>
                 <div style={{position:"absolute",top:0,left:0,bottom:0,right:0,cursor:"pointer"}} onClick={() => this.setState({showDate: !this.state.showDate})}/>
                 { this.state.showDate && <Calendar onSelect={this.getDate} selected={{start: this.state.arriveDate, end: this.state.leaveDate}}/> }
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder={`${this.state.passengers.adults + this.state.passengers.children + this.state.passengers.babies} passengers`} ref="flightPeople" disabled/>
                 <div style={{position:"absolute",top:0,left:0,bottom:0,right:0,cursor:"pointer"}} onClick={() => this.setState({showPersonPicker: !this.state.showPersonPicker})}/>
                 {
                   this.state.showPersonPicker &&
                   (<div className="personPicker">
                     <p>Passengers</p>
                     <div className="personPicker__container">
                       <p className="personPicker__title">Adults: </p>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"adults",true)}>+</i>
                       <span>{this.state.passengers.adults}</span>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"adults",false)}>-</i>
                     </div>
                     <div className="personPicker__container">
                       <p className="personPicker__title">Children: </p>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"children",true)}>+</i>
                       <span>{this.state.passengers.children}</span>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"children",false)}>-</i>
                     </div>
                     <div className="personPicker__container">
                       <p className="personPicker__title">Babies: </p>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"babies",true)}>+</i>
                       <span>{this.state.passengers.babies}</span>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"babies",false)}>-</i>
                     </div>
                     <p>Class</p>
                     <div className="personPicker__container">
                       <Radiobutton id="first" group="class" label="First Class" handleClick={this.classSelect} selected={this.state.cabin === "first"}/>
                       <Radiobutton id="business" group="class" label="Business" handleClick={this.classSelect} selected={this.state.cabin === "business"}/>
                       <Radiobutton id="economy" group="class" label="Economy" handleClick={this.classSelect} selected={this.state.cabin === "economy"}/>
                     </div>
                   </div>)

                 }
               </div>
               <Link to="/results" onClick={this.onSearch} className={Object.keys(this.state.chosenFlight).length === 0 ? "btn primary disabledLink" : "btn primary"}>
                 <span>Search</span>
               </Link>
             </div>
           ) : (
             <div className="searchbar__filters">
               <div className="searchbar__container">
                 <input type="text" placeholder="Where do you want to go?" onKeyUp={this.getHotels} onBlur={this.closeList} onFocus={this.showList} ref="hotelFrom"/>
                 <ul className="searchbar__results">{hotelFromList}</ul>
               </div>
               <div className="searchbar__container">
                 <input type="text" placeholder="Checkin to Checkout" ref="hotelDate" disabled/>
                 <div style={{position:"absolute",top:0,left:0,bottom:0,right:0,cursor:"pointer"}} onClick={() => this.setState({showDate: !this.state.showDate})}/>
                 { this.state.showDate && <Calendar onSelect={this.getDate} selected={{start: this.state.arriveDate, end: this.state.leaveDate}}/> }
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder="insert personpicker" ref="hotelPeople" disabled/>
                 <div style={{position:"absolute",top:0,left:0,bottom:0,right:0,cursor:"pointer"}} onClick={() => this.setState({showPersonPicker: !this.state.showPersonPicker})}/>
                 {
                   this.state.showPersonPicker &&
                   (<div className="personPicker">
                     <p>Guests</p>
                     <div className="personPicker__container">
                       <p className="personPicker__title">Adults: </p>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"adults",true)}>+</i>
                       <span>{this.state.passengers.adults}</span>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"adults",false)}>-</i>
                     </div>
                     <div className="personPicker__container">
                       <p className="personPicker__title">Children: </p>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"children",true)}>+</i>
                       <span>{this.state.passengers.children}</span>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"children",false)}>-</i>
                     </div>
                     <div className="personPicker__container">
                       <p className="personPicker__title">Babies: </p>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"babies",true)}>+</i>
                       <span>{this.state.passengers.babies}</span>
                       <i className="personPicker__icon" onClick={this.changePassengers.bind(this,"babies",false)}>-</i>
                     </div>
                   </div>)

                 }
               </div>
               <Link to='/results' onClick={this.onSearch} className={(Object.keys(this.state.chosenHotel).length !== 0 && this.state.arriveDate !== "") ? "btn primary" : "btn primary disabledLink"}>
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
