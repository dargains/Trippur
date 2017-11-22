import React from 'react';
import Axios from "axios";
import api from "../api";
import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import DestinationsList from "../components/DestinationsList";
import Newsletter from "../components/Newsletter";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
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

export default Home;
