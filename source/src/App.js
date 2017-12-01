import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
    this.changeLocation = this.changeLocation.bind(this);
  }
  changeType(type) {
    this.setState({type});
  }
  changeLocation(location) {
    let header = {};
    if (location === "home") header = {
        theme:"white",
        position: "absolute"
      }
    if (location === "results") header = {
        theme:"",
        position: ""
      }
    this.setState({header})
  }
  getData(data){
    console.log(data);
  }
  render() {
    return (
      <main>
        <Header {...this.state.header}/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Home changeType={this.changeType} sendData={this.getData} getLocation={this.changeLocation}/>} />
            <Route exact path="/results" render={() => <Results type={this.state.type} query={this.state.query} getLocation={this.changeLocation}/>} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </main>
    );
  }
}

export default App;
