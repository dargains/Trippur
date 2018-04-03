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

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject  = {};

  for(var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for(i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
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
      hotels: [],
      flights: [],
      rates:[],
      districts:[],
      stars:[],
      propertyTypes:[],
      amenities:[],
      hotelName:"",
      stops:[],
      airlines:[],
      initialPriceMin:0,
      initialPriceMax:10,
      priceMin:0,
      priceMax:10,
      initialDurationMin:0,
      initialDurationMax:10,
      durationMin:0,
      durationMax:10,
      cabin:"",
      info: {
        airports:[],
        cities:[],
        airlines:[],
        filters:{}
      },
      sort: "bestPrice",
      order: "asc",
      totalCount: 0,
      currentPage: 1,
      itemsPerPage: 10,
      gotRates: false,
      intervalId:0,

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
    this.updateAmenities = this.updateAmenities.bind(this);
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
    if (typeof(params.stops) === "string") params.stops = putIntoArray(params.stops);
    if (typeof(params.stars) === "string") params.stars = putIntoArray(params.stars);
    if (typeof(params.airlines) === "string") params.airlines = putIntoArray(params.airlines);
    if (typeof(params.districts) === "string") params.districts = putIntoArray(params.districts);
    if (typeof(params.propertyTypes) === "string") params.propertyTypes = putIntoArray(params.propertyTypes);
    params.oneWay = params.oneWay === "true"; //string to boolean
    this.setState({
      ...params,
      loading:true,
      firstLoad:true,
      noResults:false,

    },() => {
      if (this.state.type === "hotels") this.getHotelsSearch();
      if (this.state.type === "flights") this.getFlightSearch();
    });
    //this.getCurrency();
  }
  newSearch() {
    this.setState({
      firstLoad: true,
      noResults: false,
      loading: true,
      showFilters: false,
      actualCurrency:"EUR",
      actualCurrencySymbol: "€",
      hotels: [],
      flights: [],
      rates:[],
      districts:[],
      stars:[],
      propertyTypes:[],
      amenities:[],
      hotelName:"",
      stops:[],
      airlines:[],
      priceMin:0,
      priceMax:10,
      durationMin:0,
      durationMax:10,
      cabin:"",
      info: {
        airports:[],
        cities:[],
        airlines:[],
        filters:{}
      },
      sort: "bestPrice",
      order: "asc",
      totalCount: 0,
      currentPage: 1,
      itemsPerPage: 10,
      gotRates: false,
      intervalId:0,
      gotResponse:""
    },this.getParams);
  }
  updateView(isNew) {
    if (isNew === undefined) {
      this.setState({currentPage:1},() => {this.updateView(true)})
    } else {
      if (this.state.type === "hotels") {
        this.updateQS();
        //this.getHotels();
      }
      if (this.state.type === "flights") {
        this.updateQS();
        //this.getFlights();
      }
    }
  }
  updateQS() {
    const qs = {};
    if (this.state.type === "flights") {
      qs.type = this.state.type;
      qs.inbound = this.state.inbound;
      qs.outbound = this.state.outbound;
      qs.arriveDate = this.state.arriveDate;
      qs.leaveDate = this.state.leaveDate;
      qs.cabin = this.state.cabin;
      qs.cityDest = this.state.cityDest;
      qs.cityArri = this.state.cityArri;
      qs.adultsCount = this.state.adultsCount;
      qs.childrenCount = this.state.childrenCount;
      qs.infantsCount	 = this.state.infantsCount	;
      qs.currency_code = this.state.actualCurrency;
      qs.stops = this.state.stops;
      qs.priceMin = this.state.priceMin;
      qs.priceMax = this.state.priceMax;
      qs.durationMin = this.state.durationMin;
      qs.durationMax = this.state.durationMax;
      qs.airlines = this.state.airlines;
      qs.sort = this.state.sort;
      qs.order = this.state.order;
      qs.currentPage = this.state.currentPage;
      qs.oneWay = this.state.oneWay;
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
      qs.priceMin = this.state.priceMin;
      qs.priceMax = this.state.priceMax;
      qs.districts = this.state.districts;
      qs.amenities = this.state.amenities;
      qs.stars = this.state.stars;
      qs.hotelName = this.state.hotelName;
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
    const params = {
      search: {
        cityCode: state.cityCode,
        roomsCount:1,
        guestsCount:state.adultsCount,
        checkIn: state.arriveDate,
        checkOut: state.leaveDate,
        siteCode: "PT",
        locale: this.props.lang,
        lang: this.props.lang,
        currencyCode: this.state.actualCurrency,
        deviceType: "desktop",
        appType: "IOS_APP",
        userCountryCode: "PT"
      }
    }
    const headers = {"Content-Type": "application/json"};
    Axios.post(api.getHotelSearch, JSON.stringify(params), {headers})
    .then(function (response) {
      response.data.hotels.forEach((hotel,index) => {
        const reviewsCount = hotel.reviews ? hotel.reviews.reduce((a, b) => a + b.count, 0) : 0;
        hotel.reviewsCount = reviewsCount;
      });
      that.setState({
        searchId: response.data.search.id,
        info: response.data,
        hotels: response.data.hotels,
        gotResponse:"hotels",
        loading:false,
        firstLoad:false,
        responseCount: 0,
        totalCount: response.data.hotels.length,
      },that.getHotels);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getHotels() {
    var that = this,
        state = this.state;
    const params = {
      search: {
        cityCode: state.cityCode,
        roomsCount:1,
        guestsCount:state.adultsCount,
        checkIn: state.arriveDate,
        checkOut: state.leaveDate,
        siteCode: "PT",
        locale: this.props.lang,
        lang: this.props.lang,
        currencyCode: this.state.actualCurrency,
        deviceType: "desktop",
        appType: "IOS_APP",
        userCountryCode: "PT"
      },
      offset:state.responseCount
    }
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

        let newRates = state.rates;
        newRates.push(...response.data.rates);

        newHotels.forEach((hotel,index) => {
          const hotelRates = newRates.filter(rate => rate.hotelId === hotel.id)
          const bestPrice = Math.min(...hotelRates.map(rate => rate.price.amount));
          const bestRate = hotelRates.filter(rate => rate.price.amount === bestPrice)[0];

          if (bestRate) {
            hotel.bestRate = bestRate;
            hotel.bestPrice = bestPrice;
          } else newHotels.splice(index,1);
          const reviewsCount = hotel.reviews ? hotel.reviews.reduce((a, b) => a + b.count, 0) : 0;
          hotel.reviewsCount = reviewsCount;
        });

        let newCount = response.data.count;

        that.setState({
          info: response.data,
          hotels: newHotels,
          rates: newRates,
          priceMin: response.data.filter.minPrice.amount,
          priceMax: response.data.filter.maxPrice.amount,
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
      search: {
        siteCode: "PT",
        lang: this.props.lang,
        locale: this.props.lang,
        currencyCode: this.state.actualCurrency,
        deviceType: "DESKTOP",
        cabin: this.state.cabin,
        adultsCount: this.state.adultsCount,
        childrenCount: this.state.childrenCount,
        infantsCount: this.state.infantsCount,
        legs: [
          {
            departureAirportCode: this.state.inbound,
            arrivalCityCode: this.state.outbound,
            outboundDate: this.state.arriveDate
          }
        ]
      }
    };
    if (!this.state.oneWay) {
      params.search.legs.push({
        "departureAirportCode": this.state.outbound,
        "arrivalCityCode": this.state.inbound,
        "outboundDate": this.state.leaveDate
      });
    };
    const headers = {"Content-Type": "application/json"};
    Axios.post(api.getFlightSearch, JSON.stringify(params), {headers})
    .then(function (response) {
      that.setState({
        searchId:response.data.search.id,
        responseCount:0
      },that.getFlights)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFlights() {
    var that = this,
        state = this.state;
    const params = {
      search: {
        siteCode: "PT",
        locale: this.props.lang,
        lang: this.props.lang,
        currencyCode: state.actualCurrency,
        deviceType: "DESKTOP",
        cabin: state.cabin,
        adultsCount: state.adultsCount,
        childrenCount: state.childrenCount,
        infantsCount: state.infantsCount,
        legs: [
          {
            departureAirportCode: state.inbound,
            arrivalCityCode: state.outbound,
            outboundDate: state.arriveDate
          }
        ]
      },
      offset: state.responseCount
    };
    if (!this.state.oneWay) {
      params.search.legs.push({
        "departureAirportCode": state.outbound,
        "arrivalCityCode": state.inbound,
        "outboundDate": state.leaveDate
      });
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
      if (!data.count) {
        that.setState({noResults:true,loading:false,totalCount:0,flights:[],gotResponse:""});
      }
      if (state.responseCount === data.count) return;

      let newFlights = data.trips;

      newFlights.forEach((flight,index) => {
        flight.fares = data.fares.filter(fare => fare.tripId === flight.id);
        const bestPrice = Math.min(...flight.fares.map(fare => fare.price.amount));
        const bestFare = flight.fares.filter(rate => rate.price.amount === bestPrice)[0];

        if (!flight.hasOwnProperty("legs")) flight.legs = [];
        flight.legIds.forEach(leg => flight.legs.push(...data.legs.filter(legF => legF.id === leg)));

        flight.legs = flight.legs.filter((thing, index, self) =>
          index === self.findIndex((t) =>  t.id === thing.id)
        ) //remove duplicate legs

        flight.departure = flight.legs[0].departureTimeMinutes;
        flight.arrival = flight.legs[0].arrivalTimeMinutes;

        if (bestFare) {
          flight.bestFare = bestFare;
          flight.bestPrice = bestPrice;
          flight.duration = flight.legs.reduce((a, b) => a + b.durationMinutes, 0);
          // if (flight.duration > durationMax) durationMax = flight.duration;
          // if (flight.duration < durationMin) durationMin = flight.duration;
          flight.departure = flight.legs[0].departureTimeMinutes;
          flight.arrival = flight.legs[0].arrivalTimeMinutes;
        } else newFlights.splice(index,1);
      });

      if (state.info) { //cumulative filters
        for(let filter in data.filters) {
          var element = data.filters[filter];
          if (Array.isArray(element)) { //is array
            if (state.info.filters[filter]) element = element.concat(state.info.filters[filter]);
            data.filters[filter] = removeDuplicates(element,"code")
          } else { //is object
            if (state.info.filters[filter]) element = Object.assign(element,state.info.filters[filter]);
            data.filters[filter] = element;
          }
        }
      }

      state.info && data.airports.push(...state.info.airports); //cumulative airports
      state.info && data.cities.push(...state.info.cities); //cumulative cities
      state.info && data.airlines.push(...state.info.airlines); //cumulative airlines

      let initialPriceMin = data.filters.minPrice.amount < state.initialPriceMin ? data.filters.minPrice.amount : state.initialPriceMin;
      let initialPriceMax = data.filters.maxPrice.amount > state.initialPriceMax ? data.filters.maxPrice.amount : state.initialPriceMax;

      let initialDurationMin = data.filters.tripDurations.min < state.initialDurationMin ? data.filters.tripDurations.min : state.initialDurationMin;
      let initialDurationMax = data.filters.tripDurations.max > state.initialDurationMax ? data.filters.tripDurations.max : state.initialDurationMax;

      if (initialPriceMin === 0) {
        initialPriceMin = data.filters.minPrice.amount;
        initialPriceMax = data.filters.maxPrice.amount;
        initialDurationMin = data.filters.tripDurations.min;
        initialDurationMax = data.filters.tripDurations.max;
      }

      let flights = state.flights.concat(newFlights);

      let totalCount = newFlights.length + state.totalCount;

      that.setState({
        info: data,
        flights,
        fares:data.fares,
        legs:data.legs,
        gotResponse:"flights",
        initialPriceMin,
        initialPriceMax,
        priceMin:initialPriceMin,
        priceMax:initialPriceMax,
        initialDurationMin,
        initialDurationMax,
        durationMin:initialDurationMin,
        durationMax:initialDurationMax,
        loading:false,
        firstLoad:false,
        noResults:false,
        totalCount,
        responseCount: data.count
      },that.getFlights);
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
  updateAmenities(event) {
    const that = this;
    let newValue = parseInt(event.target.name,10);
    let amenities = this.state.amenities;
    let index = amenities.indexOf(newValue);
    index === -1 ? amenities.push(newValue) : amenities.splice(index, 1);
    this.setState({amenities},that.updateView);
  }
  updateStops(event) {
    const that = this;
    let newValue = event.target.name;
    let stops = this.state.stops;
    let index = stops.indexOf(newValue);
    index === -1 ? stops.push(newValue) : stops.splice(index, 1);
    this.setState({stops},that.updateView);
  }
  updateCabin(event) {
    const that = this;
    let cabin = event.target.name;
    this.setState({cabin},that.updateView);
  }
  updatePriceF(event) {
    const that = this;
    let max = event.max,
        min = event.min;
    this.setState({
      priceMin: min,
      priceMax: max
    },that.updateView);
  }
  updatePriceH(event) {
    const that = this;
    let max = event.max,
        min = event.min;
    this.setState({
      priceMin: min,
      priceMax: max
    },that.updateView);
  }
  updateAirlines(event) {
    const that = this;
    let newValue = event.target.name;
    let airlines = this.state.airlines;
    let index = airlines.indexOf(newValue);
    index === -1 ? airlines.push(newValue) : airlines.splice(index, 1);
    this.setState({airlines},that.updateView);
  }
  updateDuration(event) {
    let max = event.max,
        min = event.min;
    this.setState({
      durationMin: min,
      durationMax: max
    },this.updateView);
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
      this.setState({hotelName:event},that.updateView);
    } else {
      let hotelName  = event.target.previousElementSibling.value;
      this.setState({hotelName},that.updateView);

    }
  }
  updatePagination(event) {
    this.scrollToTop();
    this.setState({currentPage:event.selected + 1}, this.updateQS);
  }
  scrollStep() {
    if (window.pageYOffset < 600) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - 50);
  }
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
    this.setState({ intervalId: intervalId });
  }
  sortResults(event) {
    const target = event.target;
    const sort = target.dataset.sort;
    const flights = this.state.flights;
    const hotels = this.state.hotels;
    if (target.classList.contains("asc")) {
      target.classList.remove("asc");
      target.classList.add("desc");
      this.state.type === "flights"
        ? flights.sort(this.compareValues(sort,"desc"))
        : hotels.sort(this.compareValues(sort,"desc"));
      this.setState({sort,order:"desc"},() => {this.updateView(true)});
    } else if (target.classList.contains("desc")) {
      target.classList.remove("desc");
      target.classList.add("asc");
      this.state.type === "flights"
        ? flights.sort(this.compareValues(sort,"asc"))
        : hotels.sort(this.compareValues(sort,"asc"));
      this.setState({sort,order:"asc"},() => {this.updateView(true)});
    } else {
      target.parentElement.querySelectorAll("li").forEach(element => { element.classList.remove("selected","asc","desc"); });
      target.classList.add("selected", "asc");
      this.state.type === "flights"
        ? flights.sort(this.compareValues(sort,"asc"))
        : hotels.sort(this.compareValues(sort,"asc"));
      this.setState({sort,order:"asc"},() => {this.updateView(true)});
    }
  }
  compareValues(key, order='asc') {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
          return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase()
        : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase()
        : b[key];

      let comparison = 0;
      if (varA > varB) comparison = 1;
      else if (varA < varB) comparison = -1;

      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
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
                  flights={this.state.flights}
                  info={this.state.info}
                  type={this.state.type}
                  lang={this.props.lang}
                  priceMin={this.state.priceMin}
                  priceMax={this.state.priceMax}
                  stops={this.state.stops}
                  airlines={this.state.airlines}
                  durationMin={this.state.durationMin}
                  durationMax={this.state.durationMax}
                  totalCount={this.state.totalCount}
                  currentPage={this.state.currentPage}
                  itemsPerPage={this.state.itemsPerPage}
                  handlePagination={this.updatePagination}
                  currency={this.state.actualCurrencySymbol}
                  pageCount={Math.ceil(this.state.totalCount/this.state.itemsPerPage)}
                  toggleFilters={() => this.setState({showFilters: !this.state.showFilters})}
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
                  info={this.state.info}
                  stars={this.state.stars}
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
                  changeAmenities={this.updateAmenities}
                />
                {this.state.noResults && <p className="results__foundItems">No Results</p>}
                <ResultsList
                  hotels={this.state.hotels}
                  info={this.state.info}
                  rates={this.state.rates}
                  stars={this.state.stars}
                  districts={this.state.districts}
                  propertyTypes={this.state.propertyTypes}
                  hotelName={this.state.hotelName}
                  amenities={this.state.amenities}
                  priceMin={this.state.priceMin}
                  priceMax={this.state.priceMax}
                  type={this.state.type}
                  lang={this.props.lang}
                  currentPage={this.state.currentPage}
                  itemsPerPage={this.state.itemsPerPage}
                  handlePagination={this.updatePagination}
                  currency={this.state.actualCurrencySymbol}
                  gotRates={this.state.gotRates}
                  totalCount={this.state.totalCount}
                  updateCount={this.updateCount}
                  pageCount={Math.ceil(this.state.totalCount/this.state.itemsPerPage)}
                  toggleFilters={() => this.setState({showFilters: !this.state.showFilters})}
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
