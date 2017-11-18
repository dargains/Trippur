import React from 'react';
import Axios from "axios";

import Sidebar from "./components/Sidebar";
import ResultsList from "./components/ResultsList";

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: {},
      flights: {}
    };
  }
  componentWillMount() {
    var that = this;
    Axios.get('http://api.wego.com/hotels/api/locations/search', {
      params: {
        key: "047fca814736a1a95010",
        ts_code: "18109",
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Trippur</h1>
          <Button raised color="primary">
            <Icon color="accent">flight_land</Icon>
            Primary
          </Button>
        </header>
        <div>
          {
            Object.keys(this.state.flights).length !== 0 && (
              <div className="wrapper">
                <p>Found {this.state.flights.count} hotels</p>
                <Sidebar {...this.state.flights}/>
                <ResultsList {...this.state.flights}/>
              </div>
            )
          }
          {
            Object.keys(this.state.hotels).length !== 0 && (
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

export default App;
