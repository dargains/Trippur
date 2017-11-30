import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Axios from "axios";
import api from "./api";

import Home from "./containers/Home";
import Results from "./containers/Results";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error404 from "./components/Error404";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: {},
      flights: {},
      type: "flights"
    };
    this.changeType = this.changeType.bind(this);
  }
  componentWillMount() {
    //this.getHotels();
    //this.getFlights();
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
  changeType(type) {
    this.setState({type});
  }
  getData(data){
    console.log(data);
  }
  render() {
    return (
      <main>
        <Header theme="" position=""/>
        {/* // NOTE: if home -> white, else nothing, absolute, else nothing */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Home changeType={this.changeType} sendData={this.getData}/>} />
            <Route exact path="/results" render={() => <Results type={this.state.type} query={this.state.query}/>} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </main>
    );
  }
}

export default App;
