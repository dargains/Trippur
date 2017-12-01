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
      flights: {}
    };
  }
  componentWillMount() {
    if (this.props.type === "hotels") this.getHotelsId();
    if (this.props.type === "flights") this.getFlights();
    this.props.getLocation("results")
  }
  getHotelsId() {
    var that = this;
    //debugger
    Axios.get(api.getHotels, {
      params: {
        location_id: "5806",
        check_in: "2018-01-01",
        check_out: "2018-01-10",
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

      },
      crossdomain: true
    })
    .then(function (response) {
      that.setState({hotels:response.data.hotels},()=>console.log(that.state.hotels));
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
        <div>
          {
            this.state.flights.length && (
              <div className="wrapper">
                <p>Found {this.state.flights.count} flights</p>
                <Sidebar {...this.state.flights}/>
                <ResultsList {...this.state.flights}/>
              </div>
            )}
            {
            this.state.hotels.length && (
              <div className="wrapper">
                <p>Found {this.state.hotels.count} hotels</p>
                <Sidebar {...this.state.hotels}/>
                <ResultsList {...this.state.hotels}/>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Results);
