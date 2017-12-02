import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import api from "../api";
import queryString from "query-string";

import Sidebar from "../components/Sidebar";
import ResultsList from "../components/ResultsList";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noResults: false,
      hotels: {},
      flights: {},
      districts:[],
      stars:[],
      property_types:[]
    };
    this.updateDistricts = this.updateDistricts.bind(this);
    this.updateStars = this.updateStars.bind(this);
    this.updatePropType = this.updatePropType.bind(this);
  }
  componentWillMount() {
    const params = queryString.parse(this.props.history.location.search);
    if (this.props.type === "hotels") this.getHotelsId();
    if (this.props.type === "flights") this.getFlights();
    this.props.getLocation("results");
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
      that.setState({hotelId:response.data.search_id},that.getHotels)
      //that.getHotels(response.data.search_id);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getHotels() {
    var that = this;
    console.log(this.state);
    Axios.get("http://api.wego.com/hotels/api/search/" + that.state.hotelId + "?key=047fca814736a1a95010&ts_code=18109", {
      params: {
        districts: that.state.districts,
        stars: that.state.stars,
        property_types: that.state.property_types,
        currency_code: "EUR"
      },
      crossdomain: true
    })
    .then(function (response) {
      that.setState({hotels:response.data,gotResponse:"hotels"});
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
        that.getFares(response.data.id,response.data.trips[0].id)

      },10000);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFares(search_id, trip_id) {
    const that = this,
          id = Math.floor(Math.random() * 1000000000);
    const params = {
      "id": id,
      "search_id": search_id,
      "trip_id": trip_id,
      "fares_query_type": "route",
      "page": 1,
      "per_page": 10,
      "currency_code": "EUR"
    }
    Axios.post(api.getFares, JSON.stringify(params))
    .then(function(response) {
      let data = response.data;
      data.routes_count > 0 ? that.setState({flights:data,gotResponse:"flights"}) : that.setState({noResults:true});
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
    this.setState({districts},that.getHotels);
  }
  updateStars(event) {
    const that = this;
    let newValue = event.target.name;
    let stars = this.state.stars;
    let index = stars.indexOf(newValue);
    index === -1 ? stars.push(newValue) : stars.splice(index, 1);
    this.setState({stars},that.getHotels);
  }
  updatePropType(event) {
    const that = this;
    let newValue = event.target.name;
    let property_types = this.state.property_types;
    let index = property_types.indexOf(newValue);
    index === -1 ? property_types.push(newValue) : property_types.splice(index, 1);
    this.setState({property_types},that.getHotels);
  }
  render() {
    return (
      <div className="results">
        {this.state.noResults && <p className="results__foundItems">No Results</p>}
        {/* // NOTE: acertar isto */}
          {
            this.state.gotResponse === "flights" && !this.state.noResults && (
              <div className="wrapper">
                <p className="results__foundItems">Found {this.state.flights.routes_count} flights</p>
                <Sidebar {...this.state.flights} type={this.props.type}/>
                <ResultsList {...this.state.flights} type={this.props.type}/>
              </div>)
            }
            {
            this.state.gotResponse === "hotels" && !this.state.noResults && (
              <div className="wrapper">
                <p className="results__foundItems">Found {this.state.hotels.filtered_count} hotels</p>
                <Sidebar {...this.state.hotels} type={this.props.type} changeDistrict={this.updateDistricts} changeStar={this.updateStars} changePropType={this.updatePropType}/>
                <ResultsList {...this.state.hotels} type={this.props.type}/>
              </div>)
          }
      </div>
    );
  }
}

export default withRouter(Results);
