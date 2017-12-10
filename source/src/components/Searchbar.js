import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import api from "../api";
import lang from "../lang";
import moment from "moment";
import queryString from "query-string";

import Datepicker from "./Datepicker";
import PersonPicker from "./PersonPicker";
import Spinner from "./Spinner";
import Checkbox from './Checkbox';

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
      cabin:"economy",
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
    this.changeOneWay = this.changeOneWay.bind(this);
  }
  componentWillMount() {
    if (this.props.context === "results") {
      const params = queryString.parse(this.props.history.location.search);
      params.type === "flights"
        ? this.setState({type:params.type}, () => {
          this.refs.inboundAirport.value = params.cityArri;
          this.refs.outboundAirport.value = params.cityDest;
          params.leaveDate
            ? this.refs.flightDate.value = `${moment(params.arriveDate).format("D[/]M[/]YYYY")} ${lang[this.props.lang].Searchbar.until} ${moment(params.leaveDate).format("D[/]M[/]YYYY")}`
            : this.refs.flightDate.value = `${moment(params.arriveDate).format("D[/]M[/]YYYY")}`;
          params.leaveDate && this.setState({oneWay:true})
          this.setState({
            people: {
              adults_count:parseInt(params.adults_count, 10),
              children_count:parseInt(params.children_count, 10),
              infants_count:parseInt(params.infants_count, 10)
            },
            arriveDate: params.arriveDate,
            leaveDate: params.leaveDate,
            cabin: params.cabin
          })
        })
        : this.setState({type:params.type}, () => {
          this.refs.hotel.value = params.cityDest;
          this.refs.hotelDate.value = `${moment(params.arriveDate).format("D[/]M[/]YYYY")} ${lang[this.props.lang].Searchbar.until} ${moment(params.leaveDate).format("D[/]M[/]YYYY")}`;
          this.setState({
            people: {
              adults_count:parseInt(params.adults_count, 10),
              children_count:parseInt(params.children_count, 10),
              infants_count:parseInt(params.infants_count, 10)
            },
            arriveDate: params.arriveDate,
            leaveDate: params.leaveDate
          })
        })
      }
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
      cabin:"economy",
      oneWay:false,
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
      response.data.airports
      ? type === "inbound"
        ? that.setState({inboundAirports: response.data.airports,gotResponse:true})
        : that.setState({outboundAirports: response.data.airports,gotResponse:true})
      : type === "inbound"
        ? that.setState({inboundAirports: [],gotResponse:true})
        : that.setState({outboundAirports: [],gotResponse:true})
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
  chooseAirport(type, event) {
    const airport = event.target.dataset,
          flightInfo = {
            id: airport.airportid,
            country_name: airport.countryname,
            country_code: airport.countrycode,
            city: airport.cityname
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
        lang: this.props.lang,
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
      //console.log(error);
    });
  }
  chooseHotel(event) {
    const hotel = event.target.dataset,
          chosenHotel = {
            id: hotel.hotelid,
            country_name: hotel.countryname,
            country_code: hotel.countrycode,
            cityDest: hotel.cityname
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
    people[type] = operation
      ? this.state.people[type]+1
      : (type === "adults_count" && this.state.people[type] === 1) //must be at least 1 adult
        ? 1
        : this.state.people[type] === 0
          ? 0
          : this.state.people[type]-1;

    this.setState({people});
  }
  getDate(event) {
    if (this.state.oneWay) {
      const startDate = moment(event).format("D[/]M[/]YYYY");
      const arriveDate = moment(event).format("YYYY[-]M[-]D");
      this.refs.flightDate.value = `${startDate}`;
      this.setState({
        arriveDate,
        showDate: false
      });
    } else {
      if (event.eventType !== 3) return;
      const startDate = moment(event.start).format("D[/]M[/]YYYY");
      const arriveDate = moment(event.start).format("YYYY[-]M[-]D");

      const endDate = moment(event.end).format("D[/]M[/]YYYY");
      const leaveDate = moment(event.end).format("YYYY[-]M[-]D");

      const dateInput = this.state.type === "flights"
        ? this.refs.flightDate
        : this.refs.hotelDate;
      dateInput.value = `${startDate} ${lang[this.props.lang].Searchbar.until} ${endDate}`;
      this.setState({
        arriveDate,
        leaveDate,
        showDate: false
      });
    }

  }
  changeOneWay() {
    this.setState({
      oneWay: !this.state.oneWay,
      arriveDate:"",
      leaveDate:""
    })
    this.refs.flightDate.value = "";
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
        cityDest: state.chosenFlight.outbound.city,
        cityArri: state.chosenFlight.inbound.city,
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
        cityDest: state.chosenHotel.cityDest,
        adults_count: parseInt(state.people.adults_count, 10),
        children_count: parseInt(state.people.children_count, 10),
        infants_count: parseInt(state.people.infants_count, 10)
      }
    this.props.history.push(`/Results?${serialize(info)}`);
    this.props.context === "results" && this.props.handleSearch();
  }
  render() {
    const hotels = this.state.hotels.map(hotel => <li key={hotel.id} data-hotelid={hotel.id} data-countrycode={hotel.country_code} data-countryname={hotel.country_name} data-cityname={hotel.name.split(",")[0].split(' ').join('')} onClick={this.chooseHotel}>{hotel.name}</li>);

    const inboundAirports = this.state.inboundAirports.map(airport => <li key={airport.iata} data-airportid={airport.iata} data-countrycode={airport.country.iso} data-countryname={airport.country.name} data-cityname={airport.city.split(' ').join('')} onClick={this.chooseAirport.bind(this,"inbound")}>{airport.name}</li>);

    const outboundAirports = this.state.outboundAirports.map(airport => <li key={airport.iata} data-airportid={airport.iata} data-countrycode={airport.country.iso} data-countryname={airport.country.name} data-cityname={airport.city.split(' ').join('')} onClick={this.chooseAirport.bind(this,"outbound")}>{airport.name}</li>);

    const selectedTime = this.state.oneWay
      ? this.state.arriveDate
      : {start: this.state.arriveDate, end: this.state.leaveDate}

    const searchLang = lang[this.props.lang].Searchbar;

    return (
      <div className={this.props.context === "results" ? "searchbar secondary" : "searchbar"}>
        <ul className="searchbar__types">
          <li onClick={this.onTypeChange} data-type="flights" className={this.state.type === "flights" ? "active" : ""}>
            <i className="icon-airplane"></i>{searchLang.tabs.flights}
          </li>
          <li onClick={this.onTypeChange} data-type="hotels" className={this.state.type === "hotels" ? "active" : ""}>
            <i className="icon-briefcase"></i>{searchLang.tabs.hotels}
          </li>
        </ul>
        {
          this.state.type === "flights"
          // flights
           ? (
             <div className="searchbar__filters">
               <div className="searchbar__container">
                 <input type="text" placeholder={searchLang.filter.flights.from} ref="inboundAirport" onKeyUp={this.getAirports.bind(this,"inbound")} onFocus={this.showList} onBlur={this.closeList} onDoubleClick={(event) => console.log(event.target.value = "")}/>
                 {!this.state.gotResponse && <Spinner />}
                 <ul className="searchbar__results">{inboundAirports}</ul>
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder={searchLang.filter.flights.whereTo} ref="outboundAirport" onKeyUp={this.getAirports.bind(this,"outbound")} onFocus={this.showList} onBlur={this.closeList} onDoubleClick={(event) => console.log(event.target.value = "")}/>
                 {!this.state.gotResponse && <Spinner />}
                 <ul className="searchbar__results">{outboundAirports}</ul>
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder={this.state.oneWay ? searchLang.filter.flights.dateOneway : searchLang.filter.flights.date} ref="flightDate" disabled/>
                 <div className="placeholder" onClick={() => this.setState({showDate: !this.state.showDate})}/>
                 { this.state.showDate &&
                   <Datepicker
                     lang={this.props.lang}
                     oneWay={this.state.oneWay}
                     onSelect={this.getDate}
                     selected={selectedTime}
                   />
                 }
                 <Checkbox id="flightReturn" name="flightReturn" label={searchLang.filter.flights.oneWay} checked={this.state.oneWay} handleClick={this.changeOneWay}/>
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder={`${this.state.people.adults_count + this.state.people.children_count + this.state.people.infants_count} ${searchLang.filter.flights.passengers}`} ref="flightPeople" disabled/>
                 <div className="placeholder" onClick={() => this.setState({showPersonPicker: !this.state.showPersonPicker})}/>
                 { this.state.showPersonPicker &&
                   <PersonPicker
                     lang={this.props.lang}
                     label={lang[this.props.lang].PersonPicker.flightLabel}
                     changePeople={this.changePeople}
                     class={true}
                     cabin={this.state.cabin}
                     classSelect={this.classSelect}
                     {...this.state.people}
                   />
                 }
               </div>
               <button onClick={this.onSearch} className={Object.keys(this.state.chosenFlight.inbound).length !== 0 && Object.keys(this.state.chosenFlight.outbound).length !== 0 && this.state.arriveDate !== "" ? "btn primary" : "btn primary disabled"}>
                 <span>{searchLang.searchButton}</span>
               </button>
             </div>
           ) : (
             // hotels
             <div className="searchbar__filters">
               <div className="searchbar__container">
                 <input type="text" placeholder={searchLang.filter.hotels.whereTo} onKeyUp={this.getHotels} onBlur={this.closeList} onFocus={this.showList} ref="hotel" onDoubleClick={(event) => console.log(event.target.value = "")}/>
                 {!this.state.gotResponse && <Spinner />}
                 <ul className="searchbar__results">{hotels}</ul>
               </div>
               <div className="searchbar__container">
                 <input type="text" placeholder={searchLang.filter.hotels.date} ref="hotelDate" disabled/>
                 <div className="placeholder" onClick={() => this.setState({showDate: !this.state.showDate})}/>
                 { this.state.showDate &&
                   <Datepicker
                     lang={this.props.lang}
                     onSelect={this.getDate}
                     selected={{start: this.state.arriveDate, end: this.state.leaveDate}}/>
                   }
               </div>
                 <div className="searchbar__container">
                 <input type="text" placeholder={`${this.state.people.adults_count + this.state.people.children_count + this.state.people.infants_count} ${searchLang.filter.hotels.guests}`} ref="hotelPeople" disabled/>
                 <div className="placeholder" onClick={() => this.setState({showPersonPicker: !this.state.showPersonPicker})}/>
                 { this.state.showPersonPicker &&
                   <PersonPicker
                     lang={this.props.lang}
                     label={lang[this.props.lang].PersonPicker.hotelLabel}
                     changePeople={this.changePeople}
                     {...this.state.people}
                   />
                 }
               </div>
               <button onClick={this.onSearch} className={(Object.keys(this.state.chosenHotel).length !== 0 && this.state.arriveDate !== "") ? "btn primary" : "btn primary disabled"}>
                 <span>{searchLang.searchButton}</span>
               </button>
             </div>
           )
        }
      </div>
    )
  }
}

export default withRouter(Searchbar);
