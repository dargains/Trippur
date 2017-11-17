import React from 'react';

import Sidebar from "./components/Sidebar";
import ResultsList from "./components/ResultsList";

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        min: 2,
        max: 10
      }
    };
  }
  handleRange(value) {
    this.setState({ value })
    console.log(value)
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
        <main>
          <div className="wrapper">
            <Sidebar />
            <ResultsList />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
