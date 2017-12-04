import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import api from "../api";
import queryString from "query-string";

import Sidebar from "../components/Sidebar";
import ResultsList from "../components/ResultsList";
import Overlay from "../components/Overlay";
import PleaseWait from "../components/PleaseWait";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLoad: true,
      noResults: false,
      loading: true,
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
      cabin:""
    };
    this.updateStars = this.updateStars.bind(this);
    this.updateStops = this.updateStops.bind(this);
    this.updateCabin = this.updateCabin.bind(this);
    this.updatePriceF = this.updatePriceF.bind(this);
    this.updatePriceH = this.updatePriceH.bind(this);
    this.redirectHotel = this.redirectHotel.bind(this);
    this.updatePropType = this.updatePropType.bind(this);
    this.updateAirlines = this.updateAirlines.bind(this);
    this.updateDistricts = this.updateDistricts.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
  }
  componentWillMount() {
    const params = queryString.parse(this.props.history.location.search);
    this.setState({info:params,cabin:params.cabin},() => {
      if (this.state.info.type === "hotels") this.getHotelsId();
      if (this.state.info.type === "flights") this.getFlights();
    });
    this.getCurrency();
    this.props.getLocation("results");
  }
  updateCalls() {
    if (this.state.info.type === "hotels") this.getHotels();
    if (this.state.info.type === "flights") this.getFares();
  }
  // TODO: cancel das chamadas
  getHotelsId() {
    var that = this,
        info = this.state.info;
    Axios.get(api.getHotels, {
      params: {
        location_id: info.id,
        check_in: info.arriveDate,
        check_out: info.leaveDate,
        guests: info.adults_count,
        user_ip: "direct"
      },
      crossdomain: true
    })
    .then(function (response) {
      setTimeout(()=>{
        that.setState({hotelsId:response.data.search_id},that.getHotels)
      },5000);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getHotels() {
    this.setState({loading:true});
    var that = this;
    Axios.get("http://api.wego.com/hotels/api/search/" + that.state.hotelsId + "?key=047fca814736a1a95010&ts_code=18109", {
      params: {
        districts: that.state.districts,
        stars: that.state.stars,
        property_types: that.state.property_types,
        currency_code: "EUR",
        price_max: that.state.price_max,
        price_min: that.state.price_min,
        page: that.state.currentPage,
        per_page: 10
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
    const that = this;
    Axios.get("http://api.wego.com/hotels/api/search/redirect/" + that.state.hotelsId + "?key=047fca814736a1a95010&ts_code=18109",{
      params: {
        search_id: that.state.search_id,
        hotel_id: hotelId,
        room_rate_id: roomId,
        locale:"en",
        currency_code: that.state.actualCurrency
      }
    })
    .then(function (response) {
      window.open().document.write(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFlights() {
    const info = this.state.info,
          that = this;
    let params = {
      "trips": [{
        "departure_code": info.inbound,
        "arrival_code": info.outbound,
        "inbound_date": info.leaveDate,
        "outbound_date": info.arriveDate
      }],
      "adults_count": info.adults_count,
      "children_count": info.children_count,
      "infants_count": info.infants_count,
      "cabin": info.cabin,
      "currency_code": "EUR"
    }
    Axios.post(api.getFlights, JSON.stringify(params))
    .then(function (response) {
      setTimeout(()=>{
        that.setState({search_id:response.data.id,trip_id:response.data.trips[0].id},that.getFares)
      },5000);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFares() {
    this.setState({loading:true});
    const that = this,
          id = Math.floor(Math.random() * 1000000000);
    const params = {
      "id": id,
      "search_id": that.state.search_id,
      "trip_id": that.state.trip_id,
      "stop_types": that.state.stop_types,
      "cabin": that.state.cabin,
      "fares_query_type": "route",
      "price_max_usd": that.state.price_max_usd,
      "price_min_usd": that.state.price_min_usd,
      "airline_codes": that.state.airline_codes,
      "page": that.state.currentPage,
      "per_page": 10,
      "currency_code": "EUR"
    }
    Axios.post(api.getFares, JSON.stringify(params))
    .then(function(response) {
      let data = response.data;
      data.routes_count > 0 ? that.setState({
        flights:data,
        gotResponse:"flights",
        loading:false,
        firstLoad:false,
        totalCount:data.filtered_routes_count
      }) : that.setState({noResults:true,loading:false});
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
    this.setState({districts},that.updateCalls);
  }
  updateStars(event) {
    const that = this;
    let newValue = event.target.name;
    let stars = this.state.stars;
    let index = stars.indexOf(newValue);
    index === -1 ? stars.push(newValue) : stars.splice(index, 1);
    this.setState({stars},that.updateCalls);
  }
  updatePropType(event) {
    const that = this;
    let newValue = event.target.name;
    let property_types = this.state.property_types;
    let index = property_types.indexOf(newValue);
    index === -1 ? property_types.push(newValue) : property_types.splice(index, 1);
    this.setState({property_types},that.updateCalls);
  }
  updateStops(event) {
    const that = this;
    let newValue = event.target.name;
    let stop_types = this.state.stop_types;
    let index = stop_types.indexOf(newValue);
    index === -1 ? stop_types.push(newValue) : stop_types.splice(index, 1);
    this.setState({stop_types},that.updateCalls);
  }
  updateCabin(event) {
    const that = this;
    let cabin = event.target.name;
    this.setState({cabin},that.updateCalls);
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
    },that.updateCalls);
  }
  updatePriceH(event) {
    const that = this;
    let max = event.max,
        min = event.min;
    this.setState({
      price_min: min,
      price_max: max
    },that.updateCalls);
  }
  updateAirlines(event) {
    const that = this;
    let newValue = event.target.name;
    let airline_codes = this.state.airline_codes;
    let index = airline_codes.indexOf(newValue);
    index === -1 ? airline_codes.push(newValue) : airline_codes.splice(index, 1);
    this.setState({airline_codes},that.updateCalls);
  }
  updatePagination(event) {
    this.setState({currentPage:event.selected + 1},this.updateCalls)
  }
  render() {
    return (
      <div className="results">
        {this.state.loading && <Overlay />}
        {this.state.firstLoad && <PleaseWait />}
        {/* flights */}
          {
            this.state.gotResponse === "flights" && !this.state.noResults && (
              <div className="wrapper">
                <p className="results__foundItems">Found {this.state.flights.routes_count} flights</p>
                <Sidebar
                  {...this.state.flights}
                  type={this.state.info.type}
                  changeStops={this.updateStops}
                  changeCabin={this.updateCabin}
                  changePrice={this.updatePriceF}
                  changeAirlines={this.updateAirlines}
                  currency={this.state.actualCurrencySymbol}
                />
                {this.state.noResults && <p className="results__foundItems">No Results</p>}
                <ResultsList
                  {...this.state.flights}
                  type={this.state.info.type}
                  currentPage={this.state.currentPage}
                  handlePagination={this.updatePagination}
                  pageCount={Math.ceil(this.state.totalCount/10)}
                />
              </div>)
            }
            {/* hotels */}
            {
            this.state.gotResponse === "hotels" && !this.state.noResults && (
              <div className="wrapper">
                <p className="results__foundItems">Found {this.state.hotels.filtered_count} hotels</p>
                <Sidebar
                  {...this.state.hotels}
                  type={this.state.info.type}
                  changeStar={this.updateStars}
                  changePrice={this.updatePriceH}
                  changePropType={this.updatePropType}
                  changeDistrict={this.updateDistricts}
                  currency={this.state.actualCurrencySymbol}
                />
                {this.state.noResults && <p className="results__foundItems">No Results</p>}
                <ResultsList
                  {...this.state.hotels}
                  type={this.state.info.type}
                  onRateClick={this.redirectHotel}
                  currentPage={this.state.currentPage}
                  handlePagination={this.updatePagination}
                  pageCount={Math.ceil(this.state.totalCount/10)}
                />
              </div>)
          }
      </div>
    );
  }
}

export default withRouter(Results);
