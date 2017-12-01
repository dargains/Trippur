import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import api from "../api";

import Sidebar from "../components/Sidebar";
import ResultsList from "../components/ResultsList";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: {},
      flights: {},
      gotResponse: ""
    };
  }
  componentWillMount() {
    this.setState({type:this.props.type})
    if (this.props.type === "hotels") this.getHotelsId();
    if (this.props.type === "flights") this.getFlights();
    this.props.getLocation("results")
  }
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
      that.getHotels(response.data.search_id);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getHotels(id) {
    var that = this;
    Axios.get("http://api.wego.com/hotels/api/search/" + id + "?key=047fca814736a1a95010&ts_code=18109", {
      params: {
        currency_code: "EUR"
      },
      crossdomain: true
    })
    .then(function (response) {
      that.setState({hotels:response.data,gotResponse:"hotel"});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getFlights() {
    var that = this;
    Axios({
      method: "post",
      url: api.getFlights,
      data: {
        "trips": [{
          "departure_code": "RGN",
          "arrival_code": "NYU",
          "outbound_date": "2017-12-08"
        }],
        "adults_count": 1,
        "user_country_code": "PT",
        "country_site_code": "pt"
      }
    })
    .then(function (response) {
      that.setState({flights: response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div className="results">
          {
            this.state.gotResponse === "flight" && (
              <div className="wrapper">
                <p className="results__foundItems">Found {this.state.flights.count} flights</p>
                <Sidebar {...this.state.flights}/>
                <ResultsList {...this.state.flights}/>
              </div>)
            }
            {
            this.state.gotResponse === "hotel" && (
              <div className="wrapper">
                <p className="results__foundItems">Found {this.state.hotels.total_count} hotels</p>
                <Sidebar {...this.state.hotels}/>
                <ResultsList {...this.state.hotels}/>
              </div>)
          }
      </div>
    );
  }
}

export default withRouter(Results);
