import React, { Component } from "react";
import {withRouter} from 'react-router-dom';

import Hero from "../components/Hero";
import DestinationsList from "../components/DestinationsList";
import Newsletter from "../components/Newsletter";

class Home extends Component {
  render() {
    return (
      <div>
        <Hero />
        <DestinationsList />
        <Newsletter />
      </div>
    )
  }
}

export default withRouter(Home);
