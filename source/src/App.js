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
      hotel: {},
      flight: {},
      type: "flights"
    };
    this.changeType = this.changeType.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  changeType(type) {
    this.setState({type});
  }
  onRouteChange(location) {
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
    this.state.type === "flights"
      ? this.setState({flight: data})
      : this.setState({hotel: data});
  }
  render() {
    return (
      <main>
        <Header {...this.state.header}/>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Home changeType={this.changeType} sendData={this.getData} getLocation={this.onRouteChange}/>} />
            <Route exact path="/results" render={() => <Results type={this.state.type} info={this.state.type === "flights" ? this.state.flight : this.state.hotel} getLocation={this.onRouteChange}/>} />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </main>
    );
  }
}

export default App;
