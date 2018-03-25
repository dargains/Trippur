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
      hotels: {},
      flights: {},
      districts:[],
      stars:[],
      propertyTypes:[],
      stop_types:[],
      airline_codes :[],
      cabin:"",
      currentPage: 1,
      itemsPerPage: 20,
      gotRates: false
    };
    this.newSearch = this.newSearch.bind(this);
    this.updateView = this.updateView.bind(this);
    this.sortResults = this.sortResults.bind(this);
    this.updateStars = this.updateStars.bind(this);
    this.updateStops = this.updateStops.bind(this);
    this.updateCabin = this.updateCabin.bind(this);
    this.updatePriceF = this.updatePriceF.bind(this);
    this.updatePriceH = this.updatePriceH.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.updateAirlines = this.updateAirlines.bind(this);
    this.updateHotelName = this.updateHotelName.bind(this);
    this.updateDistricts = this.updateDistricts.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
    this.updateInboundTime = this.updateInboundTime.bind(this);
    this.updatePropertyType = this.updatePropertyType.bind(this);

  }
  componentWillMount() {
    var view = this;
    Axios.post(api.getCredentials)
      .then(response => {
        Axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.access_token;
        view.setState({
          token:response.data.access_token
        },view.getParams);
      })
      .catch(error => {
        console.log(error);
      })
  }
  getParams() {
    const params = queryString.parse(this.props.history.location.search);
    if (typeof(params.stop_types) === "string") params.stop_types = putIntoArray(params.stop_types);
    if (typeof(params.stars) === "string") params.stars = putIntoArray(params.stars);
    if (typeof(params.airline_codes) === "string") params.airline_codes = putIntoArray(params.airline_codes);
    if (typeof(params.districts) === "string") params.districts = putIntoArray(params.districts);
    if (typeof(params.propertyTypes) === "string") params.propertyTypes = putIntoArray(params.propertyTypes);
    this.setState({
      ...params,
      loading:true,
      firstLoad:true,
      noResults:false,
      search: {
        cityCode: params.cityCode,
        roomsCount:1,
        guestsCount:params.adultsCount,
        checkIn: params.arriveDate,
        checkOut: params.leaveDate,
        siteCode: "PT",
        locale: this.props.lang,
        currencyCode: this.state.actualCurrency,
        deviceType: "desktop",
        appType: "IOS_APP",
        userCountryCode: "PT"
      }
    },() => {
      if (this.state.type === "hotels") this.getHotelsSearch();
      if (this.state.type === "flights") this.getFlightSearch();
    });
    //this.getCurrency();
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
        this.getFlights();
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
      qs.cityDest = this.state.cityDest;
      qs.adultsCount = this.state.adultsCount;
      qs.childrenCount = this.state.childrenCount;
      qs.infantsCount	 = this.state.infantsCount	;
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
      qs.cityDest = this.state.cityDest;
      qs.cityCode = this.state.cityCode;
      qs.adultsCount = this.state.adultsCount;
      qs.childrenCount = this.state.childrenCount;
      qs.infantsCount	 = this.state.infantsCount	;
      qs.currency_code = this.state.actualCurrency;
      qs.price_min = this.state.price_min_usd;
      qs.price_max = this.state.price_max_usd;
      qs.districts = this.state.districts;
      qs.stars = this.state.stars;
      qs.text_filter = this.state.text_filter;
      qs.propertyTypes = this.state.propertyTypes;
      qs.sort = this.state.sort;
      qs.order = this.state.order;
      qs.currentPage = this.state.currentPage;
    }
    const newQs = queryString.stringify(qs);
    this.props.history.push("/Results?" + newQs);
  }
  getHotelsSearch() {
    this.setState({loading:true,showFilters:false});
    var that = this,
        state = this.state;
    const params = {search: state.search}
    const headers = {"Content-Type": "application/json"};
    Axios.post(api.getHotelSearch, JSON.stringify(params), {headers})
    .then(function (response) {
      that.setState({
        searchId: response.data.search.id,
        info: response.data,
        hotels: response.data.hotels,
        rates: response.data.rates,
        gotResponse:"hotels",
        loading:false,
        firstLoad:false,
        responseCount: 0,
        totalCount: response.data.hotels.length
      },that.getHotels);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getHotels() {
    var that = this,
        state = this.state;
    const params = {search: state.search,offset:state.responseCount}
    Axios.get(
      `${api.getHotelSearch}${state.searchId}/results`,
      {
        withCredentials: false,
        crossdomain: true,
        params,
      }
    )
    .then(function (response) {
      if (state.responseCount === response.data.count) return;
      if (response.data.count) {
        let newHotels = state.hotels;
        newHotels.push(...response.data.hotels);
        let newCount = state.responseCount + response.data.count;
        that.setState({
          info: response.data,
          hotels: newHotels,
          rates: response.data.rates,
          gotResponse: "hotels",
          responseCount: newCount,
          totalCount: newHotels.length,
          gotRates: true
        },that.getHotels);
      } else {
        that.setState({
          noResults:true,
          loading:false,
          totalCount:0,
          hotels:[],
          gotResponse:""
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFlightSearch() {
    const that = this;
    const params = {
      "search": {
        "siteCode": "PT",
        "locale": this.props.lang,
        "currencyCode": this.state.actualCurrency,
        "deviceType": "DESKTOP",
        "cabin": this.state.cabin,
        "adultsCount": this.state.adultsCount,
        "childrenCount": this.state.childrenCount,
        "infantsCount": this.state.infantsCount,
        "legs": [
          {
            "departureAirportCode": this.state.inbound,
            "arrivalCityCode": this.state.outbound,
            "outboundDate": this.state.arriveDate
          },
          {
            "departureAirportCode": this.state.outbound,
            "arrivalCityCode": this.state.inbound,
            "outboundDate": this.state.leaveDate
          }
        ]
      },
      "paymentMethodIds": []
    }
    const headers = {"Content-Type": "application/json"};
    Axios.post(api.getFlightSearch, JSON.stringify(params), {headers})
    .then(function (response) {
      //setTimeout(()=>{
        that.setState({searchId:response.data.search.id},that.getFlights)
      //},5000);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFlights() {
    this.setState({loading:true,showFilters:false});
    var that = this,
        state = this.state;
    const params = {
      searchId: state.searchId,
      stop_types: state.stop_types,
      cabin: state.cabin,
      adultsCount: state.adultsCount,
      childrenCount: state.childrenCount,
      infantsCount	: state.infantsCount,
      legs: [
        {
          departureAirportCode: state.inbound,
          arrivalCityCode: state.outbound,
          outboundDate: state.arriveDate
        },
        {
          departureAirportCode: state.outbound,
          arrivalCityCode: state.inbound,
          outboundDate: state.leaveDate
        }
      ],
      fares_query_type: "route",
      inbound_departure_day_time_min: state.inbound_departure_day_time_min,
      inbound_departure_day_time_max: state.inbound_departure_day_time_max,
      currencyCode: state.actualCurrency,
      price_min_usd: state.price_min_usd,
      price_max_usd: state.price_max_usd,
      duration_min: state.duration_min,
      duration_max: state.duration_max,
      airline_codes: state.airline_codes,
      user_country_code: that.props.lang,
      locale: that.props.lang,
      sort: state.sort,
      order: state.order,
      page: state.currentPage,
      per_page: state.itemsPerPage,
      deviceType: "DESKTOP",
      offset:0,
    }
    Axios.get(
      `${api.getFlightSearch}${that.state.searchId}/results`,
      {
        withCredentials: false,
        crossdomain: true,
        params,
      }
    )
    .then(function(response) {
      let data = response.data;
      data.filtered_routes_count > 0
        ? that.setState({
          flights:data,
          gotResponse:"flights",
          loading:false,
          firstLoad:false,
          noResults:false,
          totalCount:data.filtered_routes_count
        })
        : that.setState({noResults:true,loading:false,totalCount:0,flights:[],gotResponse:""});
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
    let propertyTypes = this.state.propertyTypes;
    let index = propertyTypes.indexOf(newValue);
    index === -1 ? propertyTypes.push(newValue) : propertyTypes.splice(index, 1);
    this.setState({propertyTypes},that.updateView);
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
    this.setState({currentPage:event.selected + 1}, this.updateQS);
  }
  updateDuration(event) {
    let max = event.max,
        min = event.min;
    this.setState({
      duration_min: min,
      duration_max: max
    },this.updateQS);
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
  updateHotelName(event) {
    const that = this;
    if (typeof(event) === "string") {
      this.setState({text_filter:event},that.updateView);
    } else {
      let text_filter  = event.target.previousElementSibling.value;
      this.setState({text_filter},that.updateView);

    }
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
        {/* flights */
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
        {/* hotels */
          this.state.gotResponse === "hotels" && (
            <div className="results">
              <Sortbar type={this.state.type} handleClick={this.sortResults} lang={this.props.lang}/>
              <div className="wrapper">
                <p className="results__foundItems">{resultsLang.results1} {this.state.totalCount} {resultsLang.resultsH}</p>
                <Sidebar
                  {...this.state}
                  {...this.state.info}
                  hotels={this.state.hotels}
                  rates={this.state.rates}
                  type={this.state.type}
                  lang={this.props.lang}
                  show={this.state.showFilters}
                  changeStar={this.updateStars}
                  changePrice={this.updatePriceH}
                  changeName={this.updateHotelName}
                  changeDistrict={this.updateDistricts}
                  changePropType={this.updatePropertyType}
                />
                {this.state.noResults && <p className="results__foundItems">No Results</p>}
                <ResultsList
                  {...this.state.info}
                  hotels={this.state.hotels}
                  rates={this.state.rates}
                  type={this.state.type}
                  lang={this.props.lang}
                  toggleFilters={() => this.setState({showFilters: !this.state.showFilters})}
                  currentPage={this.state.currentPage}
                  itemsPerPage={this.state.itemsPerPage}
                  handlePagination={this.updatePagination}
                  currency={this.state.actualCurrencySymbol}
                  gotRates={this.state.gotRates}
                  pageCount={Math.ceil(this.state.totalCount/this.state.itemsPerPage)}
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
