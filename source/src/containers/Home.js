import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

import Hero from "../components/Hero";
import DestinationsList from "../components/DestinationsList";
import Newsletter from "../components/Newsletter";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {
    this.props.getLocation("home")
  }
  render() {
    return (
      <div>
        <Hero changeType={this.props.changeType} sendData={this.props.sendData}/>
        <DestinationsList />
        <Newsletter />
      </div>
    )
  }
}

export default withRouter(Home);
