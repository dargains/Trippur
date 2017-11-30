import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import api from "../api";

import moment from "moment";
import InfiniteCalendar, {withRange, Calendar} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet

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
      selectedOption: '',
    }
    this.onTypeChange = this.onTypeChange.bind(this);
    this.getHotels = this.getHotels.bind(this);
    this.chooseHotel = this.chooseHotel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.closeList = this.closeList.bind(this);
    this.getHotelDate = this.getHotelDate.bind(this);
    this.getFlightDate = this.getFlightDate.bind(this);
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
      people: 1
    });
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
    this.setState({chosenHotel},()=> console.log(that.state.chosenHotel));
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
  closeList(event) {
    var list = event.target.nextElementSibling;
    setTimeout(() => {
      list.style.display = "none";
    },100)
  }
  showList(event) {
    event.target.nextElementSibling.style.display = "block";
  }
  getHotelDate(event) {
    if (event.eventType === 2) return;
    console.log(event.start);
    console.log(moment().format("YYYY-MM-DD"));
    //console.log(event.start.format("YYYY-MM-DD HH:mm:ss"));
    const startMonth = event.start.getUTCMonth() + 1;
    const startDay = event.start.getUTCDate();
    const startYear = event.start.getUTCFullYear();
    const startDate = `${startDay}/${startMonth}/${startYear}`;
    const arriveDate = `${startYear}/${startMonth}/${startDay}`;

    const endMonth = event.end.getUTCMonth() + 1;
    const endDay = event.end.getUTCDate();
    const endYear = event.end.getUTCFullYear();
    const endDate = `${endDay}/${endMonth}/${endYear}`
    const leaveDate = `${endYear}/${endMonth}/${endDay}`;

    this.refs.hotelDate.value = `${startDate} to ${endDate}`;
    // this.setState({
    //   arriveDate,
    //   leaveDate
    // });
  }
  getFlightDate(event) {
    if (event.eventType === 2) return;
    console.log(event);
    const startMonth = event.start.getUTCMonth() + 1;
    const startDay = event.start.getUTCDate();
    const startYear = event.start.getUTCFullYear();
    const startDate = `${startDay}/${startMonth}/${startYear}`
    const arriveDate = `${startYear}/${startMonth}/${startDay}`;

    const endMonth = event.end.getUTCMonth() + 1;
    const endDay = event.end.getUTCDate();
    const endYear = event.end.getUTCFullYear();
    const endDate = `${endDay}/${endMonth}/${endYear}`
    const leaveDate = `${endYear}/${endMonth}/${endDay}`;

    this.refs.flightDate.value = `${startDate} to ${endDate}`;
    // this.setState({
    //   arriveDate,
    //   leaveDate
    // });
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
                 <input type="text" placeholder="insert datepicker" ref="flightDate"/>
                 <InfiniteCalendar
                   className="datePicker"
                   width={"100%"}
                   height={300}
                   Component={withRange(Calendar)}
                   selected={{
                     start: moment(),
                     end: moment().add(3, "days"),
                   }}
                   minDate={moment().toDate()}
                   displayOptions={{
                     showHeader: false
                   }}
                   onSelect= {this.getFlightDate}
                   theme={{
                     selectionColor: '#FFA726',
                     accentColor: '#FF8706',
                     textColor: {
                       default: '#333',
                       active: '#FFF'
                     },
                     weekdayColor: '#FFA726',
                     floatingNav: {
                       background: '#FF8706',
                       color: '#FFF',
                       chevron: '#FFA726'
                     }
                  }}
                 />
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder="insert personpicker" ref="flightPeople"/>
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
                 <input type="text" placeholder="insert datepicker" ref="hotelDate"/>
                 <InfiniteCalendar
                   className="datePicker"
                   width={"100%"}
                   height={300}
                   Component={withRange(Calendar)}
                   selected={{
                     start: moment(),
                     end: moment().add(3, "days"),
                   }}
                   minDate={moment().toDate()}
                   displayOptions={{
                     showHeader: false
                   }}
                   onSelect= {this.getHotelDate}
                   theme={{
                     selectionColor: '#FFA726',
                     accentColor: '#FF8706',
                     textColor: {
                       default: '#333',
                       active: '#FFF'
                     },
                     weekdayColor: '#FFA726',
                     floatingNav: {
                       background: '#FF8706',
                       color: '#FFF',
                       chevron: '#FFA726'
                     }
                  }}
                 />
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder="insert personpicker" ref="hotelPeople"/>
               </div>
               <Link to='/results' onClick={this.onSearch} className={Object.keys(this.state.chosenHotel).length === 0 ? "btn primary disabledLink" : "btn primary"}>
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
