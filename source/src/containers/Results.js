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
      currentPage: 1,
      hotels: {},
      flights: {},
      districts:[],
      stars:[],
      property_types:[],
      stop_types:[],
      airline_codes :[]
    };
    this.updateDistricts = this.updateDistricts.bind(this);
    this.updateStars = this.updateStars.bind(this);
    this.updatePropType = this.updatePropType.bind(this);
    this.updateStops = this.updateStops.bind(this);
    this.getRoomRates = this.getRoomRates.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
  }
  componentWillMount() {
    const params = queryString.parse(this.props.history.location.search);
    if (this.props.type === "hotels") this.getHotelsId();
    if (this.props.type === "flights") this.getFlights();
    this.props.getLocation("results");
  }
  updateCalls() {
    if (this.props.type === "hotels") this.getHotels();
    if (this.props.type === "flights") this.getFares();
  }
  // TODO: cancel das chamadas
  // TODO: loading
  getHotelsId() {
    var that = this,
        info = this.props.info;
    Axios.get(api.getHotels, {
      params: {
        location_id: info.id,
        check_in: info.arriveDate,
        check_out: info.leaveDate,
        guests: info.people.adults_count,
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
        "page": that.state.currentPage,
        "per_page": 10
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
  getRoomRates(hotelId,roomId, event) {
    const that = this;
    Axios.get("http://api.wego.com/hotels/api/search/redirect/" + that.state.hotelsId + "?key=047fca814736a1a95010&ts_code=18109",{
      params: {
        search_id: that.state.search_id,
        hotel_id: hotelId,
        room_rate_id: roomId,
        locale:"en",
        currency_code: "EUR"
      }
    })
    .then(function (response) {
      var newWin = window.open('url','windowName','height=300,width=300');
      newWin.document.write(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFlights() {
    const info = this.props.info,
          that = this;
    let params = {
      "trips": [{
        "departure_code": info.inbound.id,
        "arrival_code": info.outbound.id,
        "inbound_date": info.leaveDate,
        "outbound_date": info.arriveDate
      }],
      "adults_count": info.people.adults_count,
      "children_count": info.people.children_count,
      "infants_count": info.people.infants_count,
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
      "fares_query_type": "route",
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
        totalCount:data.total_count
      }) : that.setState({noResults:true,loading:false});
    })
    .catch(function (error) {
      console.log(error);
      that.props.history.push("/");
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
  updatePagination(event) {
    console.log(event.selected + 1);
    this.setState({currentPage:event.selected + 1},this.updateCalls)
  }
  render() {
    return (
      <div className="results">
        {this.state.noResults && <p className="results__foundItems">No Results</p>}
        {this.state.loading && <Overlay />}
        {this.state.firstLoad && <PleaseWait />}
        {/* flights */}
          {
            this.state.gotResponse === "flights" && !this.state.noResults && (
              <div className="wrapper">
                <p className="results__foundItems">Found {this.state.flights.routes_count} flights</p>
                <Sidebar
                  {...this.state.flights}
                  type={this.props.type}
                  changeStops={this.updateStops}
                />
                <ResultsList
                  {...this.state.flights}
                  type={this.props.type}
                  handlePagination={this.updatePagination}
                  pageCount={Math.ceil(this.state.totalCount/10)}
                  currentPage={this.state.currentPage}
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
                  type={this.props.type}
                  changeDistrict={this.updateDistricts}
                  changeStar={this.updateStars}
                  changePropType={this.updatePropType}
                />
                <ResultsList
                  {...this.state.hotels}
                  type={this.props.type}
                  onRateClick={this.getRoomRates}
                  handlePagination={this.updatePagination}
                  pageCount={Math.ceil(this.state.totalCount/10)}
                  currentPage={this.state.currentPage}
                />
              </div>)
          }
          {/* // TODO: paginação */}
      </div>
    );
  }
}

export default withRouter(Results);
