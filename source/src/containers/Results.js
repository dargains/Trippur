import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import api from "../api";
import lang from "../lang";
import queryString from "query-string";

import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import ResultsList from "../components/ResultsList";
import Overlay from "../components/Overlay";
import Sortbar from "../components/Sortbar";
import PleaseWait from "../components/PleaseWait";
import Photobar from "../components/Photobar";

const putIntoArray = element => {
  let buffer = element;
  element = [];
  element.push(buffer);
  return element;
}

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoad: true,
      noResults: false,
      loading: true,
      showFilters: false,
      actualCurrency:"EUR",
      actualCurrencySymbol: "€",
      currentPage: 1,
      hotels: {},
      flights: {},
      districts:[],
      stars:[],
      property_types:[],
      stop_types:[],
      airline_codes :[],
      cabin:"",
      itemsPerPage: 20
    };
    this.newSearch = this.newSearch.bind(this);
    this.updateView = this.updateView.bind(this);
    this.sortResults = this.sortResults.bind(this);
    this.updateStars = this.updateStars.bind(this);
    this.updateStops = this.updateStops.bind(this);
    this.updateCabin = this.updateCabin.bind(this);
    this.updatePriceF = this.updatePriceF.bind(this);
    this.updatePriceH = this.updatePriceH.bind(this);
    this.redirectHotel = this.redirectHotel.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.updateAirlines = this.updateAirlines.bind(this);
    this.updateDistricts = this.updateDistricts.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
    this.updateInboundTime = this.updateInboundTime.bind(this);
    this.updatePropertyType = this.updatePropertyType.bind(this);

  }
  componentWillMount() {
    this.getParams()
  }
  getParams() {
    const params = queryString.parse(this.props.history.location.search);
    if (typeof(params.stop_types) === "string") params.stop_types = putIntoArray(params.stop_types);
    if (typeof(params.stars) === "string") params.stars = putIntoArray(params.stars);
    if (typeof(params.airline_codes) === "string") params.airline_codes = putIntoArray(params.airline_codes);
    if (typeof(params.districts) === "string") params.districts = putIntoArray(params.districts);
    if (typeof(params.property_types) === "string") params.property_types = putIntoArray(params.property_types);
    this.setState({
      ...params,
      loading:true,
      firstLoad:true,
      noResults:false
    },() => {
      if (this.state.type === "hotels") this.getHotelsId();
      if (this.state.type === "flights") this.getFlights();
    });
    this.getCurrency();
  }
  newSearch() {
    this.setState({gotResponse: false},this.getParams);
  }
  updateView(isNew) {
    if (isNew === undefined) {
      this.setState({currentPage:1},() => {this.updateView(true)})
    } else {
      if (this.state.type === "hotels") {
        this.updateQS("hotels");
        this.getHotels();
      }
      if (this.state.type === "flights") {
        this.updateQS("flights");
        this.getFares();
      }
    }
  }
  updateQS(type) {
    const qs = {};
    if (type === "flights") {
      qs.type = this.state.type;
      qs.inbound = this.state.inbound;
      qs.outbound = this.state.outbound;
      qs.arriveDate = this.state.arriveDate;
      qs.leaveDate = this.state.leaveDate;
      qs.cabin = this.state.cabin;
      qs.adults_count = this.state.adults_count;
      qs.children_count = this.state.children_count;
      qs.infants_count = this.state.infants_count;
      qs.currency_code = this.state.actualCurrency;
      qs.stop_types = this.state.stop_types;
      qs.price_min_usd = this.state.price_min_usd;
      qs.price_max_usd = this.state.price_max_usd;
      qs.duration_min = this.state.duration_min;
      qs.duration_max = this.state.duration_max;
      qs.airline_codes = this.state.airline_codes;
      qs.sort = this.state.sort;
      qs.order = this.state.order;
      qs.currentPage = this.state.currentPage;
    } else {
      qs.type = this.state.type;
      qs.id = this.state.id;
      qs.location_id = this.state.id;
      qs.arriveDate = this.state.arriveDate;
      qs.leaveDate = this.state.leaveDate;
      qs.adults_count = this.state.adults_count;
      qs.children_count = this.state.children_count;
      qs.infants_count = this.state.infants_count;
      qs.currency_code = this.state.actualCurrency;
      qs.price_min = this.state.price_min_usd;
      qs.price_max = this.state.price_max_usd;
      qs.districts = this.state.districts;
      qs.stars = this.state.stars;
      qs.property_types = this.state.property_types;
      qs.sort = this.state.sort;
      qs.order = this.state.order;
      qs.currentPage = this.state.currentPage;
    }
    const newQs = queryString.stringify(qs);
    this.props.history.push("/Results?" + newQs);
  }
  getHotelsId() {
    var that = this,
        state = this.state;
    Axios.get(api.getHotels, {
      params: {
        location_id: state.id,
        check_in: state.arriveDate,
        check_out: state.leaveDate,
        guests: state.adults_count,
        user_ip: "direct"
      },
      crossdomain: true
    })
    .then(function (response) {
      setTimeout(()=>{
        that.setState({hotelsId:response.data.search_id},that.getHotels)
      },10000);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getHotels() {
    this.setState({loading:true,showFilters:false});
    var that = this;
    Axios.get("https://cors-anywhere.herokuapp.com/http://api.wego.com/hotels/api/search/" + that.state.hotelsId + "?key=047fca814736a1a95010&ts_code=18109", {
      params: {
        districts: that.state.districts,
        stars: that.state.stars,
        property_types: that.state.property_types,
        currency_code: that.state.actualCurrency,
        price_min: that.state.price_min,
        price_max: that.state.price_max,
        sort: that.state.sort,
        order: that.state.order,
        lang: that.props.lang,
        page: that.state.currentPage,
        per_page: that.state.itemsPerPage
      },
      crossdomain: true
    })
    .then(function (response) {
      that.setState({
        hotels:response.data,
        gotResponse:"hotels",
        loading:false,
        firstLoad:false,
        totalCount:response.data.filtered_count
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  redirectHotel(hotelId,roomId, event) {
    window.open(`http://api.wego.com/hotels/api/search/redirect/${this.state.hotelsId}?key=047fca814736a1a95010&ts_code=18109&$search_id={search_id}&hotel_id=${hotelId}&room_rate_id=${roomId}&locale=${this.props.lang}&currency_code=${this.state.actualCurrency}`);
  }
  getFlights() {
    const that = this;
    let params = {
      trips: [{
        departure_code: this.state.inbound,
        arrival_code: this.state.outbound,
        outbound_date: this.state.arriveDate,
        inbound_date: this.state.leaveDate
      }],
      adults_count: this.state.adults_count,
      cabin: that.state.cabin,
      currency_code: this.state.actualCurrency
    }
    Axios.post(api.getFlights, JSON.stringify(params))
    .then(function (response) {
      setTimeout(()=>{
        that.setState({search_id:response.data.id,trip_id:response.data.trips[0].id},that.getFares)
      },10000);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFares() {
    this.setState({loading:true,showFilters:false});
    const that = this,
          id = Math.floor(Math.random() * 1000000000);
    const params = {
      id: id,
      search_id: that.state.search_id,
      trip_id: that.state.trip_id,
      stop_types: that.state.stop_types,
      cabin: that.state.cabin,
      adults_count: that.state.adults_count,
      children_count: that.state.children_count,
      infants_count: that.state.infants_count,
      fares_query_type: "route",
      inbound_departure_day_time_min: that.state.inbound_departure_day_time_min,
      inbound_departure_day_time_max: that.state.inbound_departure_day_time_max,
      currency_code: that.state.actualCurrency,
      price_min_usd: that.state.price_min_usd,
      price_max_usd: that.state.price_max_usd,
      duration_min: that.state.duration_min,
      duration_max: that.state.duration_max,
      airline_codes: that.state.airline_codes,
      user_country_code: that.props.lang,
      locale: that.props.lang,
      sort: that.state.sort,
      order: that.state.order,
      page: that.state.currentPage,
      per_page: that.state.itemsPerPage
    }
    Axios.post(api.getFares, JSON.stringify(params))
    .then(function(response) {
      let data = response.data;
      data.routes_count > 0 ? that.setState({
        flights:data,
        gotResponse:"flights",
        loading:false,
        firstLoad:false,
        noResults:false,
        totalCount:data.filtered_routes_count
      }) : that.setState({noResults:true,loading:false,totalCount:0});
    })
    .catch(function (error) {
      console.log(error);
      that.props.history.push("/");
    });
  }
  getCurrency() {
    const that = this;
    Axios.get(api.getCurrency)
    .then(function (response) {
      that.setState({currencies:response.data.currencies.currencies});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  updateDistricts(event) {
    const that = this;
    let newValue = event.target.name;
    let districts = this.state.districts;
    let index = districts.indexOf(newValue);
    index === -1 ? districts.push(newValue) : districts.splice(index, 1);
    this.setState({districts},that.updateView);
  }
  updateStars(event) {
    const that = this;
    let newValue = event.target.name;
    let stars = this.state.stars;
    let index = stars.indexOf(newValue);
    index === -1 ? stars.push(newValue) : stars.splice(index, 1);
    this.setState({stars},that.updateView);
  }
  updatePropertyType(event) {
    const that = this;
    let newValue = event.target.name;
    let property_types = this.state.property_types;
    let index = property_types.indexOf(newValue);
    index === -1 ? property_types.push(newValue) : property_types.splice(index, 1);
    this.setState({property_types},that.updateView);
  }
  updateStops(event) {
    const that = this;
    let newValue = event.target.name;
    let stop_types = this.state.stop_types;
    let index = stop_types.indexOf(newValue);
    index === -1 ? stop_types.push(newValue) : stop_types.splice(index, 1);
    this.setState({stop_types},that.updateView);
  }
  updateCabin(event) {
    const that = this;
    let cabin = event.target.name;
    this.setState({cabin},that.updateView);
  }
  updatePriceF(event) {
    const that = this;
    let maxUSD = event.max,
        minUSD = event.min,
        exchangeRate = this.state.currencies[this.state.actualCurrency].exchange_rate,
        maxAC = Math.floor(maxUSD/exchangeRate),
        minAC = Math.floor(minUSD/exchangeRate);
    this.setState({
      price_min_usd: minAC,
      price_max_usd: maxAC
    },that.updateView);
  }
  updatePriceH(event) {
    const that = this;
    let max = event.max,
        min = event.min;
    this.setState({
      price_min: min,
      price_max: max
    },that.updateView);
  }
  updateAirlines(event) {
    const that = this;
    let newValue = event.target.name;
    let airline_codes = this.state.airline_codes;
    let index = airline_codes.indexOf(newValue);
    index === -1 ? airline_codes.push(newValue) : airline_codes.splice(index, 1);
    this.setState({airline_codes},that.updateView);
  }
  updatePagination(event) {
    this.setState({currentPage:event.selected + 1},() => {this.updateView(true)})
  }
  updateDuration(event) {
    const that = this;
    let max = event.max,
        min = event.min;
    this.setState({
      duration_min: min,
      duration_max: max
    },that.updateView);
  }
  updateInboundTime(event) {
    const that = this;
    let max = event.max,
        min = event.min;
    this.setState({
      inbound_departure_day_time_min: min,
      inbound_departure_day_time_max: max
    },that.updateView);
  }
  sortResults(event) {
    const target = event.target;
    if (target.classList.contains("asc")) {
      target.classList.remove("asc");
      target.classList.add("desc");
      this.setState({sort:target.dataset.sort,order:"desc"},() => {this.updateView(true)});
    } else if (target.classList.contains("desc")) {
      target.classList.remove("desc");
      target.classList.add("asc");
      this.setState({sort:target.dataset.sort,order:"asc"},() => {this.updateView(true)});
    } else {
      target.parentElement.querySelectorAll("li").forEach(element => { element.classList.remove("selected","asc","desc"); });
      target.classList.add("selected", "asc");
      this.setState({sort:target.dataset.sort,order:"asc"},() => {this.updateView(true)});
    }
  }

  render() {
    const resultsLang = lang[this.props.lang].Results;
    return (
      <main>
        {this.state.loading && <Overlay />}
        <Searchbar context="results" handleSearch={this.newSearch} lang={this.props.lang}/>
        {this.state.firstLoad && !this.state.noResults && <PleaseWait lang={this.props.lang}/>}
        {this.state.noResults && <h2 className="noResults">{resultsLang.noResults}</h2>}
        {/* flights */}
          {
            this.state.gotResponse === "flights" && (
              <div className="results">
                <Sortbar type={this.state.type} handleClick={this.sortResults} lang={this.props.lang}/>
                <div className="wrapper">
                  <p className="results__foundItems">{resultsLang.results1} {this.state.totalCount} {resultsLang.resultsF}</p>
                  <Sidebar
                    {...this.state}
                    type={this.state.type}
                    lang={this.props.lang}
                    show={this.state.showFilters}
                    changeStops={this.updateStops}
                    changeCabin={this.updateCabin}
                    changePrice={this.updatePriceF}
                    changeDuration={this.updateDuration}
                    changeAirlines={this.updateAirlines}
                    changeInboudTime={this.updateInboundTime}
                  />
                  {this.state.noResults && <p className="results__foundItems">No Results</p>}
                  <ResultsList
                    {...this.state.flights}
                    type={this.state.type}
                    lang={this.props.lang}
                    toggleFilters={() => this.setState({showFilters: !this.state.showFilters})}
                    currentPage={this.state.currentPage}
                    handlePagination={this.updatePagination}
                    currency={this.state.actualCurrencySymbol}
                    pageCount={Math.ceil(this.state.totalCount/10)}
                  />
                  <Photobar city={this.state.cityDest} lang={this.props.lang}/>
                </div>
              </div>
            )
          }
          {/* hotels */}
          {
            this.state.gotResponse === "hotels" && (
              <div className="results">
                <Sortbar type={this.state.type} handleClick={this.sortResults} lang={this.props.lang}/>
                <div className="wrapper">
                  <p className="results__foundItems">{resultsLang.results1} {this.state.totalCount} {resultsLang.resultsH}</p>
                  <Sidebar
                    {...this.state}
                    type={this.state.type}
                    lang={this.props.lang}
                    show={this.state.showFilters}
                    changeStar={this.updateStars}
                    changePrice={this.updatePriceH}
                    changePropType={this.updatePropertyType}
                    changeDistrict={this.updateDistricts}
                  />
                  {this.state.noResults && <p className="results__foundItems">No Results</p>}
                  <ResultsList
                    {...this.state.hotels}
                    type={this.state.type}
                    lang={this.props.lang}
                    toggleFilters={() => this.setState({showFilters: !this.state.showFilters})}
                    onRateClick={this.redirectHotel}
                    currentPage={this.state.currentPage}
                    handlePagination={this.updatePagination}
                    currency={this.state.actualCurrencySymbol}
                    pageCount={Math.ceil(this.state.totalCount/10)}
                  />
                  <Photobar city={this.state.cityDest} lang={this.props.lang}/>
                </div>
              </div>
            )
          }
      </main>
    );
  }
}

export default withRouter(Results);
