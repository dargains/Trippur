import React from 'react';

import Button from 'material-ui/Button';
import {fullWhite} from 'material-ui/colors';
import Icon from 'material-ui/Icon';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 2, max: 10 },
    };
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
          <section data-margin-top="80" data-margin-bottom="80">
            <div className="wrapper">
              <InputRange
                maxValue={20}
                minValue={0}
                formatLabel={value => value}
                value={this.state.value}
                onChange={value => this.setState({ value })}
                onChangeComplete={value => console.log(value)} />
                <p>cenas</p>
              </div>
          </section>
          </main>

      </div>
    );
  }
}

export default App;
