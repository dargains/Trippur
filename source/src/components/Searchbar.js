import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Axios from "axios";
import api from "../api";
import lang from "../lang";
import moment from "moment";
import queryString from "query-string";

import Datepicker from "./Datepicker";
import PersonPicker from "./PersonPicker";
import Spinner from "./Spinner";
import Checkbox from './Checkbox';

import { ToastContainer, toast } from 'react-toastify';

var CancelToken = Axios.CancelToken;
var cancel;

function serialize(obj) {
  var str = [];
  for (var p in obj)
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
      chosenHotel: {},
      chosenFlight: {
        inbound: {},
        outbound: {}
      },
      hotels: [],
      inboundAirports: [],
      outboundAirports: [],
      inboundAirportValue: "",
      outboundAirportValue: "",
      hotelValue: "",
      arriveDate: "",
      leaveDate: "",
      selectedOption: '',
      adultsCount: 1,
      childrenCount: 0,
      infantsCount	: 0,
      cabin: "economy",
      oneWay: false,
      siteCode: this.props.lang,
      showDate: false,
      showPersonPicker: false,
      gotResponse: true
    }
    this.onTypeChange = this.onTypeChange.bind(this);
    this.getHotels = this.getHotels.bind(this);
    this.getAirports = this.getAirports.bind(this);
    this.chooseHotel = this.chooseHotel.bind(this);
    this.chooseAirport = this.chooseAirport.bind(this);
    this.search = this.search.bind(this);
    this.closeList = this.closeList.bind(this);
    this.getDate = this.getDate.bind(this);
    this.classSelect = this.classSelect.bind(this);
    this.changePeople = this.changePeople.bind(this);
    this.changeOneWay = this.changeOneWay.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.state.type === "flights"
      ? this.refs.outboundAirport.value !== this.state.outboundAirportValue && this.getAirports("outbound")
      : this.refs.hotel.value !== this.state.hotelValue && this.getHotels();
    //if (this.props.context === "results") this.setState({chosenHotel: {}, chosenFlight: { inbound: {}, outbound: {} },})
  }
  componentWillMount() {
    if (this.props.context === "results") {
      const params = queryString.parse(this.props.history.location.search);
      params.type === "flights"
        ? this.setState({
            type: params.type,
            adultsCount: parseInt(params.adultsCount, 10),
            childrenCount: parseInt(params.childrenCount, 10),
            infantsCount: parseInt(params.infantsCount, 10),
            inboundAirportValue: params.cityArri,
            outboundAirportValue: params.cityDest,
            chosenHotel: {},
            oneWay: params.oneWay === "true",
            chosenFlight: {
              inbound: {
                city: params.cityArri,
                countryName: params.cityArri,
                id: params.inbound
              },
              outbound: {
                city: params.cityDest,
                countryName: params.cityDest,
                id: params.outbound
              }
            },
            arriveDate: params.arriveDate,
            leaveDate: params.leaveDate,
            cabin: params.cabin
          }, () => {
            // this.refs.inboundAirport.value = params.cityArri;
            // this.refs.outboundAirport.value = params.cityDest;
            params.leaveDate
              ? this.refs.flightDate.value = `${moment(params.arriveDate).format("D[/]M[/]YYYY")} ${lang[this.props.lang].Searchbar.until} ${moment(params.leaveDate).format("D[/]M[/]YYYY")}`
              : this.refs.flightDate.value = `${moment(params.arriveDate).format("D[/]M[/]YYYY")}`;
            this.setState({
            })
          })
        : this.setState({
            type: params.type,
            adultsCount: parseInt(params.adultsCount, 10),
            childrenCount: parseInt(params.childrenCount, 10),
            infantsCount: parseInt(params.infantsCount, 10),
            hotelValue: params.cityDest,
            chosenHotel: {
              cityCode: params.cityCode,
              cityDest: params.cityDest,
              countryCode: params.countryCode,
              countryName: params.countryName,
              id: params.id
            },
            chosenFlight: {
              inbound: {},
              outbound: {}
            },
            arriveDate: params.arriveDate,
            leaveDate: params.leaveDate
          }, () => {
            //this.refs.hotel.value = params.cityDest;
            this.refs.hotelDate.value = `${moment(params.arriveDate).format("D[/]M[/]YYYY")} ${lang[this.props.lang].Searchbar.until} ${moment(params.leaveDate).format("D[/]M[/]YYYY")}`;
            this.setState({
            })
          });
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.onClickOutsideDP.bind(this));
    document.addEventListener('click', this.onClickOutsidePP.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onClickOutsideDP);
    document.removeEventListener('click', this.onClickOutsidePP);
  }
  onClickOutsideDP(event) {
    if (!document.getElementById("dp")) return;
    if (event.target && !document.getElementById("dp").contains(event.target)) this.setState({showDate: false});
  }
  onClickOutsidePP(event) {
    if (!document.getElementById("pp")) return;
    if (event.target && !document.getElementById("pp").contains(event.target) && !document.getElementById("dp").contains(event.target)) this.setState({showPersonPicker: false});
  }
  onTypeChange(event) {
    let type = event.target.dataset.type;
    this.setState({
      type,
      hotels: [],
      inboundAirports: [],
      outboundAirports: [],
      inboundAirportValue: "",
      outboundAirportValue: "",
      hotelValue: "",
      chosenHotel: {},
      chosenFlight: {
        inbound: {},
        outbound: {}
      },
      arriveDate: "",
      leaveDate: "",
      adultsCount: 1,
      childrenCount: 0,
      infantsCount	: 0,
      cabin: "economy",
      oneWay: false,
      showDate: false,
      showPersonPicker: false,
      gotResponse: true
    });
    document.querySelectorAll("input").forEach(input => {input.value = ""; input.classList.remove("error");});
  }
  getAirports(type) {
    var that = this;
    if (cancel !== undefined)
      cancel();
    type === "inbound"
      ? this.setState({inboundAirportValue: this.refs.inboundAirport.value})
      : this.setState({outboundAirportValue: this.refs.outboundAirport.value});
    let term = type === "inbound"
      ? this.refs.inboundAirport.value
      : this.refs.outboundAirport.value;
    this.setState({gotResponse: false})

    Axios.get(api.getLocation, {
      params: {
        language: this.props.lang,
        locales: [this.props.lang],
        query: term,
        site_code: "pt",
        min_airports:1
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      crossdomain: true
    }).then(function(response) {
      if (response.data) {
        if (type === "inbound") {
          that.setState({inboundAirports: response.data, gotResponse: true});
          that.refs.inboundAirport.focus();
        }
        else {
          that.setState({outboundAirports: response.data, gotResponse: true});
          that.refs.outboundAirport.focus();
        }
      } else {
        if (type === "inbound") that.setState({inboundAirports: [], gotResponse: true});
        else that.setState({outboundAirports: [], gotResponse: true});
      }
    }).catch(function(error) {
      //console.log(error);
    });
  }
  chooseAirport(type, event) {
    const airport = event.target.dataset,
      flightInfo = {
        id: airport.airportid,
        countryName: airport.countryname,
        countryCode: airport.countrycode,
        city: airport.cityname
      };
    let chosenFlight = this.state.chosenFlight;
    chosenFlight[type] = flightInfo
    this.setState({chosenFlight});
    type === "inbound"
      ? this.setState({inboundAirportValue: event.target.innerText})
      : this.setState({outboundAirportValue: event.target.innerText})
  }
  getHotels() {
    var that = this;
    if (cancel !== undefined)
      cancel();
    this.setState({gotResponse: false, hotelValue: this.refs.hotel.value})
    Axios.get(api.getLocation, {
      params: {
        query: that.refs.hotel.value,
        lang: this.props.lang,
        min_hotels: 1,
        currency_code: "EUR"
      },
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      crossdomain: true
    }).then(function(response) {
      that.setState({hotels: response.data, gotResponse: true});
      response.data.count && that.refs.hotel.focus();
    }).catch(function(error) {
      //console.log(error);
    });
  }
  chooseHotel(event) {
    const hotel = event.target.dataset,
      chosenHotel = {
        id: hotel.hotelid,
        countryName: hotel.countryname,
        countryCode: hotel.countrycode,
        cityDest: hotel.cityname,
        cityCode: hotel.citycode
      };
    this.setState({chosenHotel});
    this.setState({hotelValue: event.target.innerText})
  }
  showList(event) {
    event.target.nextElementSibling.style.display = "block";
  }
  closeList(event) {
    var list = event.target.nextElementSibling;
    setTimeout(() => {
      list.style.display = "none";
    }, 100)
  }
  changePeople(type, operation) {
    const people = this.state;
    people[type] = operation
      ? this.state[type] + 1
      : (type === "adultsCount" && this.state[type] === 1) //must be at least 1 adult
        ? 1
        : this.state[type] === 0
          ? 0
          : this.state[type] - 1;

    this.setState({people});
  }
  getDate(event) {
    if (this.state.oneWay) {
      const startDate = moment(event).format("DD[/]MM[/]YYYY");
      const arriveDate = moment(event).format("YYYY[-]MM[-]DD");
      this.refs.flightDate.value = `${startDate}`;
      this.setState({arriveDate, showDate: false});
    } else {
      if (event.eventType !== 3)
        return;
      const startDate = moment(event.start).format("DD[/]MM[/]YYYY");
      const arriveDate = moment(event.start).format("YYYY[-]MM[-]DD");

      const endDate = moment(event.end).format("DD[/]MM[/]YYYY");
      const leaveDate = moment(event.end).format("YYYY[-]MM[-]DD");

      const dateInput = this.state.type === "flights"
        ? this.refs.flightDate
        : this.refs.hotelDate;
      dateInput.value = `${startDate} ${lang[this.props.lang].Searchbar.until} ${endDate}`;
      this.setState({arriveDate, leaveDate, showDate: false});
    }

  }
  changeOneWay() {
    this.setState({
      oneWay: !this.state.oneWay,
      arriveDate: "",
      leaveDate: ""
    });
    this.refs.flightDate.value = "";
  }
  classSelect(event) {
    this.setState({cabin: event.target.id});
  }
  cleanInput(event) {
    var target = event.target.tagName === "DIV" ? event.target.previousElementSibling : event.target;
    target.classList.remove("error")
  }
  onSubmit() {
    let ok = this.state.type === "flights"
      ? this.checkFlightFields()
      : this.checkHotelFields();
    ok && this.search();
  }
  checkFlightFields() {
    let result = false;
    //inbound airport check
    if (Object.keys(this.state.chosenFlight.inbound).length !== 0) {
      result = true;
      this.refs.inboundAirport.classList.remove("error");
    } else {
      result = false;
      this.refs.inboundAirport.classList.add("error");
      toast.error("Origin missing");
    }
    //outbound airport check
    if (Object.keys(this.state.chosenFlight.outbound).length !== 0) {
      //result = true;
      this.refs.outboundAirport.classList.remove("error");
    } else {
      result = false;
      this.refs.outboundAirport.classList.add("error");
      toast.error("Destination missing");
    }
    //date check
    if (this.state.arriveDate) {
      //result = true;
      this.refs.flightDate.classList.remove("error");
    } else {
      result = false;
      this.refs.flightDate.classList.add("error");
      toast.error("Date missing");
    }
    return result;
  }
  checkHotelFields() {
    let result = false;
    //hotel check
    if (Object.keys(this.state.chosenHotel).length !== 0) {
      result = true;
      this.refs.hotel.classList.remove("error");
    } else {
      result = false;
      this.refs.hotel.classList.add("error");
      toast.error("Destination missing");
    }
    //date check
    if (this.state.leaveDate) {
      //result = true;
      this.refs.hotelDate.classList.remove("error");
    } else {
      result = false;
      this.refs.hotelDate.classList.add("error");
      toast.error("Date missing");
    }
    return result;
  }
  search() {
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
        adultsCount: parseInt(state.adultsCount, 10),
        childrenCount: parseInt(state.childrenCount, 10),
        infantsCount	: parseInt(state.infantsCount	, 10),
        oneWay: state.oneWay
      }
      : {
        type: "hotels",
        id: state.chosenHotel.id,
        countryCode: state.chosenHotel.countryCode,
        countryName: state.chosenHotel.countryName,
        cityCode: state.chosenHotel.cityCode,
        arriveDate: state.arriveDate,
        leaveDate: state.leaveDate,
        cityDest: state.chosenHotel.cityDest,
        adultsCount: parseInt(state.adultsCount, 10),
        childrenCount: parseInt(state.childrenCount, 10),
        infantsCount	: parseInt(state.infantsCount	, 10)
      }
    this.props.history.push(`/Results?${serialize(info)}`);
    this.props.context === "results" && this.props.handleSearch();
  }
  render() {
    const hotels = this.state.hotels.map(hotel => <li key={hotel.id} data-hotelid={hotel.id} data-countrycode={hotel.countryCode} data-countryname={hotel.countryName} data-cityname={hotel.name.split(",")[0]} data-citycode={hotel.cityCode} onClick={this.chooseHotel}>{hotel.name}, {hotel.countryName}</li>);

    const inboundAirports = this.state.inboundAirports.map(airport => <li key={airport.id} data-airportid={airport.code} data-countrycode={airport.countryCode} data-countryname={airport.countryName} data-cityname={airport.cityName} onClick={this.chooseAirport.bind(this, "inbound")}>{airport.name}, {airport.countryName}</li>);

    const outboundAirports = this.state.outboundAirports.map(airport => <li key={airport.id} data-airportid={airport.code} data-countrycode={airport.countryCode} data-countryname={airport.countryName} data-cityname={airport.cityName} onClick={this.chooseAirport.bind(this, "outbound")}>{airport.name}, {airport.countryName}</li>);

    const searchLang = lang[this.props.lang].Searchbar;

    return (<div className={this.props.context === "results" ? "searchbar secondary" : "searchbar"}>
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
          ? (<div className="searchbar__filters">
            <div className="searchbar__container">
              <input
                type="text"
                aria-label="Origin"
                ref="inboundAirport"
                onFocus={this.showList}
                onBlur={this.closeList}
                onClick={this.cleanInput}
                value={this.state.inboundAirportValue}
                placeholder={searchLang.filter.flights.from}
                onInput={this.getAirports.bind(this, "inbound")}
                onDoubleClick={() => this.setState({inboundAirportValue:""})}
              />
              {!this.state.gotResponse && <Spinner/>}
              <ul className="searchbar__results">{inboundAirports}</ul>
            </div>
            <div className="searchbar__container">
              <input
                type="text"
                aria-label="Destination"
                id="outboundAirport"
                ref="outboundAirport"
                onFocus={this.showList}
                onBlur={this.closeList}
                onClick={this.cleanInput}
                value={this.state.outboundAirportValue}
                onInput={this.getAirports.bind(this, "outbound")}
                placeholder={searchLang.filter.flights.whereTo}
                onDoubleClick={() => this.setState({outboundAirportValue:""})}
              />
              {!this.state.gotResponse && <Spinner/>}
              <ul className="searchbar__results">{outboundAirports}</ul>
            </div>
            <div className="searchbar__container" id="dp">
              <input
                type="text"
                ref="flightDate"
                aria-label="Date"
                disabled="disabled"
                placeholder={this.state.oneWay ? searchLang.filter.flights.dateOneway : searchLang.filter.flights.date}
              />
              <div className="placeholder" onClick={event => this.setState({ showDate: !this.state.showDate }, this.cleanInput(event))} />
              {this.state.showDate &&
                <Datepicker
                  lang={this.props.lang}
                  oneWay={this.state.oneWay}
                  onSelect={this.getDate}
                  selected={this.state.oneWay
                    ? this.state.arriveDate
                    : {
                      start: this.state.arriveDate,
                      end: this.state.leaveDate
                    }
                  }
                />
              }
              <Checkbox id="flightReturn" name="flightReturn" label={searchLang.filter.flights.oneWay} checked={this.state.oneWay} handleClick={this.changeOneWay}/>
            </div>
            <div className="searchbar__container" id="pp">
              <input
                type="text"
                aria-label="Passengers"
                placeholder={`${this.state.adultsCount + this.state.childrenCount + this.state.infantsCount	} ${searchLang.filter.flights.passengers}`}
                ref="flightPeople"
                disabled="disabled"/>
              <div className="placeholder" onClick={() => this.setState({ showPersonPicker: !this.state.showPersonPicker })} />
              {this.state.showPersonPicker &&
                <PersonPicker
                  class={true}
                  lang={this.props.lang}
                  cabin={this.state.cabin}
                  classSelect={this.classSelect}
                  changePeople={this.changePeople}
                  label={lang[this.props.lang].PersonPicker.flightLabel}
                  {...this.state}
                />}
            </div>
            <button onClick={this.onSubmit} className="btn primary">
              <span>{searchLang.searchButton}</span>
            </button>
          </div>)
          : (
          // hotels
          <div className="searchbar__filters">
            <div className="searchbar__container">
              <input
                type="text"
                ref="hotel"
                aria-label="Destination"
                id="hotelDestination"
                onFocus={this.showList}
                onBlur={this.closeList}
                onInput={this.getHotels}
                onClick={this.cleanInput}
                value={this.state.hotelValue}
                placeholder={searchLang.filter.hotels.whereTo}
                onDoubleClick={() => this.setState({hotelValue:""})}
              />
              {!this.state.gotResponse && <Spinner/>}
              <ul className="searchbar__results">{hotels}</ul>
            </div>
            <div className="searchbar__container" id="dp">
              <input
                type="text"
                ref="hotelDate"
                aria-label="Date"
                disabled="disabled"
                placeholder={searchLang.filter.hotels.date}
              />
              <div className="placeholder" onClick={event => this.setState({ showDate: !this.state.showDate }, this.cleanInput(event))}
              />
              { this.state.showDate &&
                <Datepicker
                  lang={this.props.lang}
                  onSelect={this.getDate}
                  selected={{ start: this.state.arriveDate, end: this.state.leaveDate }}
                />
              }
            </div>
            <div className="searchbar__container" id="pp">
              <input
                type="text"
                aria-label="Guests"
                ref="hotelPeople"
                disabled="disabled"
                placeholder={`${this.state.adultsCount + this.state.childrenCount + this.state.infantsCount	} ${searchLang.filter.hotels.guests}`}
              />
              <div className="placeholder" onClick={() => this.setState({ showPersonPicker: !this.state.showPersonPicker })}/>
                {this.state.showPersonPicker &&
                  <PersonPicker
                    lang={this.props.lang}
                    changePeople={this.changePeople}
                    label={lang[this.props.lang].PersonPicker.hotelLabel}
                    {...this.state}
                  />
                }
            </div>
            <a onClick={this.onSubmit} className="btn primary">
              <span>{searchLang.searchButton}</span>
            </a>
          </div>)
      }
      <ToastContainer pauseOnHover={false} hideProgressBar={true}/>
    </div>)
  }
}

export default withRouter(Searchbar);
