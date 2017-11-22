import React from 'react';
import Axios from "axios";
import api from "../api";

import Sidebar from "../components/Sidebar";
import ResultsList from "../components/ResultsList";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: {},
      flights: {}
    };
  }
  componentWillMount() {
    this.getHotels();
    //this.getFlights();
  }
  getHotels() {
    var that = this;
    Axios.get(api.getHotels, {
      params: {
        q: "lisbon",
        lang: "EN",
        currency_code: "USD"
      },
      crossdomain: true
    })
    .then(function (response) {
      that.setState({hotels: response.data});
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
          "outbound_date": "2017-12-04"
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
            Object.keys(this.state.flights).length > 0 && (
              <div className="wrapper">
                <p>Found {this.state.flights.count} flights</p>
                <Sidebar {...this.state.flights}/>
                <ResultsList {...this.state.flights}/>
              </div>
            )
          }
          {
            Object.keys(this.state.hotels).length > 0 && (
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

export default Results;
