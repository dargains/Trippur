import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import api from "../api";
import moment from "moment";

import Calendar from "./Calendar";
import PersonPicker from "./PersonPicker";
import Spinner from "./Spinner";

var CancelToken = Axios.CancelToken;
var cancel;

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "flights",
      chosenHotel:{},
      chosenFlight:{
        inbound: {},
        outbound: {}
      },
      hotels: [],
      inboundAirports:[],
      outboundAirports:[],
      arriveDate:"",
      leaveDate:"",
      selectedOption: '',
      people: {
        adults_count:1,
        children_count:0,
        infants_count:0
      },
      cabin:"business",
      showDate:false,
      showPersonPicker:false,
      gotResponse:true
    }
    this.onTypeChange = this.onTypeChange.bind(this);
    this.getHotels = this.getHotels.bind(this);
    this.getAirports = this.getAirports.bind(this);
    this.chooseHotel = this.chooseHotel.bind(this);
    this.chooseAirport = this.chooseAirport.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.closeList = this.closeList.bind(this);
    this.getDate = this.getDate.bind(this);
    this.classSelect = this.classSelect.bind(this);
    this.changePeople = this.changePeople.bind(this);
  }
  onTypeChange(event) {
    let type = event.target.dataset.type;
    this.setState({
      type,
      hotels:[],
      inboundAirports:[],
      outboundAirports:[],
      chosenHotel:{},
      chosenFlight:{
        inbound: {},
        outbound: {}
      },
      arriveDate:"",
      leaveDate:"",
      people: {
        adults_count:1,
        children_count:0,
        infants_count:0
      },
      cabin:"business",
      showDate:false,
      showPersonPicker:false,
      gotResponse:true
    });
    document.querySelectorAll("input").forEach(input => input.value = "");
  }
  getAirports(type) {
    var that = this;
    if (cancel !== undefined) cancel();
    let term = type === "inbound" ? this.refs.inboundAirport.value : this.refs.outboundAirport.value;
    this.setState({gotResponse:false})
    Axios.get(api.getAirports, {
      params: {
        key: "d089ae75a4",
        term: term
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      crossdomain: true
    })
    .then(function (response) {
      // NOTE: respostas pequenas sem data
      response.data.airports.length &&
      type === "inbound"
        ? that.setState({inboundAirports: response.data.airports,gotResponse:true})
        : that.setState({outboundAirports: response.data.airports,gotResponse:true})
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  chooseAirport(type, event) {
    const airport = event.target.dataset,
          flightInfo = {
            id: airport.airportid,
            country_name: airport.countryname,
            country_code: airport.countrycode
          };
    let chosenFlight = this.state.chosenFlight;
    chosenFlight[type] = flightInfo
    this.setState({chosenFlight});
    type === "inbound"
      ? this.refs.inboundAirport.value = event.target.innerText
      : this.refs.outboundAirport.value = event.target.innerText
  }
  getHotels() {
    var that = this;
    if (cancel !== undefined) cancel();
    this.setState({gotResponse:false})
    Axios.get(api.getLocations, {
      params: {
        q: that.refs.hotel.value,
        lang: "EN",
        currency_code: "EUR"
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      crossdomain: true
    })
    .then(function (response) {
      that.setState({hotels: response.data.locations,gotResponse:true});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  chooseHotel(event) {
    const hotel = event.target.dataset,
          chosenHotel = {
            id: hotel.hotelid,
            country_name: hotel.countryname,
            country_code: hotel.countrycode
          };
    this.setState({chosenHotel});
    this.refs.hotel.value = event.target.innerText;
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
  changePeople(type, operation) {
    const people = this.state.people;
    people[type] = operation ? this.state.people[type]+1 : this.state.people[type] <= 0 ? 0 : this.state.people[type]-1;
    this.setState({people});
  }
  getDate(event) {
    if (event.eventType !== 3) return;
    const startDate = moment(event.start).format("D[/]M[/]YYYY");
    const arriveDate = moment(event.start).format("YYYY[-]M[-]D");

    const endDate = moment(event.end).format("D[/]M[/]YYYY");
    const leaveDate = moment(event.end).format("YYYY[-]M[-]D");

    const dateInput = this.state.type === "flights"
      ? this.refs.flightDate
      : this.refs.hotelDate;
    dateInput.value = `${startDate} to ${endDate}`;
    this.setState({
      arriveDate,
      leaveDate,
      showDate: false
    });
  }
  classSelect(event) {
    this.setState({cabin:event.target.id});
  }
  onSearch(event) {
    const state = this.state;
    const info = this.state.type === "flights"
      ? {
        type: "flights",
        outbound: state.chosenFlight.outbound.id,
        inbound: state.chosenFlight.inbound.id,
        arriveDate: state.arriveDate,
        leaveDate: state.leaveDate,
        cabin: state.cabin,
        adults_count: parseInt(state.people.adults_count, 10),
        children_count: parseInt(state.people.children_count, 10),
        infants_count: parseInt(state.people.infants_count, 10)
      }
      : {
        type: "hotels",
        id: state.chosenHotel.id,
        countryCode: state.chosenHotel.country_code,
        countryName: state.chosenHotel.country_name,
        arriveDate: state.arriveDate,
        leaveDate: state.leaveDate,
        adults_count: parseInt(state.people.adults_count, 10),
        children_count: parseInt(state.people.children_count, 10),
        infants_count: parseInt(state.people.infants_count, 10)
      }
    this.props.history.push(`/Results?${serialize(info)}`);
    this.props.context === "results" && this.props.handleSearch();
  }
  render() {
    const hotels = this.state.hotels.map(hotel => <li key={hotel.id} data-hotelid={hotel.id} data-countrycode={hotel.country_code} data-countryname={hotel.country_name} onClick={this.chooseHotel}>{hotel.name}</li>);

    const inboundAirports = this.state.inboundAirports.map(airport => <li key={airport.iata} data-airportid={airport.iata} data-countrycode={airport.country.iso} data-countryname={airport.country.name} onClick={this.chooseAirport.bind(this,"inbound")}>{airport.name}</li>);

    const outboundAirports = this.state.outboundAirports.map(airport => <li key={airport.iata} data-airportid={airport.iata} data-countrycode={airport.country.iso} data-countryname={airport.country.name} onClick={this.chooseAirport.bind(this,"outbound")}>{airport.name}</li>);

    return (
      <div className={this.props.context === "results" ? "searchbar secondary" : "searchbar"}>
        <ul className="searchbar__types">
          <li onClick={this.onTypeChange} data-type="flights" className={this.state.type === "flights" ? "active" : ""}><i className="icon-airplane"></i>Flights</li>
          <li onClick={this.onTypeChange} data-type="hotels" className={this.state.type === "hotels" ? "active" : ""}><i className="icon-briefcase"></i>Hotels</li>
        </ul>
        {
          this.state.type === "flights"
           ? (
             <div className="searchbar__filters">
               <div className="searchbar__container">
                 <input type="text" placeholder="From" ref="inboundAirport" onKeyUp={this.getAirports.bind(this,"inbound")} onFocus={this.showList} onBlur={this.closeList}/>
                 {!this.state.gotResponse && <Spinner />}
                 <ul className="searchbar__results">{inboundAirports}</ul>
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder="Where to" ref="outboundAirport" onKeyUp={this.getAirports.bind(this,"outbound")} onFocus={this.showList} onBlur={this.closeList}/>
                 {!this.state.gotResponse && <Spinner />}
                 <ul className="searchbar__results">{outboundAirports}</ul>
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder="Depart to Return" ref="flightDate" disabled/>
                 <div style={{position:"absolute",top:0,left:0,bottom:0,right:0,cursor:"pointer"}} onClick={() => this.setState({showDate: !this.state.showDate})}/>
                 { this.state.showDate && <Calendar onSelect={this.getDate} selected={{start: this.state.arriveDate, end: this.state.leaveDate}}/> }
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder={`${this.state.people.adults_count + this.state.people.children_count + this.state.people.infants_count} passengers`} ref="flightPeople" disabled/>
                 <div style={{position:"absolute",top:0,left:0,bottom:0,right:0,cursor:"pointer"}} onClick={() => this.setState({showPersonPicker: !this.state.showPersonPicker})}/>
                 { this.state.showPersonPicker && <PersonPicker label="Passengers" changePeople={this.changePeople} {...this.state.people} class={true} cabin={this.state.cabin} classSelect={this.classSelect}/> }
               </div>
               <button onClick={this.onSearch} className={Object.keys(this.state.chosenFlight.inbound).length !== 0 && Object.keys(this.state.chosenFlight.outbound).length !== 0 && this.state.arriveDate !== "" ? "btn primary" : "btn primary disabledLink"}>
                 <span>Search</span>
               </button>
             </div>
           ) : (
             <div className="searchbar__filters">
               <div className="searchbar__container">
                 <input type="text" placeholder="Where do you want to go?" onKeyUp={this.getHotels} onBlur={this.closeList} onFocus={this.showList} ref="hotel"/>
                 {!this.state.gotResponse && <Spinner />}
                 <ul className="searchbar__results">{hotels}</ul>
               </div>
               <div className="searchbar__container">
                 <input type="text" placeholder="Checkin to Checkout" ref="hotelDate" disabled/>
                 <div style={{position:"absolute",top:0,left:0,bottom:0,right:0,cursor:"pointer"}} onClick={() => this.setState({showDate: !this.state.showDate})}/>
                 { this.state.showDate && <Calendar onSelect={this.getDate} selected={{start: this.state.arriveDate, end: this.state.leaveDate}}/> }
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder={`${this.state.people.adults_count + this.state.people.children_count + this.state.people.infants_count} guests`} ref="hotelPeople" disabled/>
                 <div style={{position:"absolute",top:0,left:0,bottom:0,right:0,cursor:"pointer"}} onClick={() => this.setState({showPersonPicker: !this.state.showPersonPicker})}/>
                 { this.state.showPersonPicker && <PersonPicker label="Guests" changePeople={this.changePeople} {...this.state.people}/> }
               </div>
               <button onClick={this.onSearch} className={(Object.keys(this.state.chosenHotel).length !== 0 && this.state.arriveDate !== "") ? "btn primary" : "btn primary disabledLink"}>
                 <span>Search</span>
               </button>
             </div>
           )
        }
      </div>
    )
  }
}

export default withRouter(Searchbar);
