import React from 'react';
import "../css/Sidebar.css";

import InputRange from 'react-input-range';
import Checkbox from 'material-ui/Checkbox';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import "react-input-range/lib/css/index.css";


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        min: 2,
        max: 10
      },
      nonStop: true,
      oneStop: false,
      twoStops: true,
    };
  }
  handleRange(value) {
    this.setState({ value })
    console.log(value)
  }
  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };
  render() {
    return (
      <aside className="sideBar">
        <p className="categoryTitle">Price</p>
        <InputRange
          maxValue={20}
          minValue={0}
          formatLabel={value => value}
          value={this.state.value}
          onChange={this.handleRange.bind(this)}
          onChangeComplete={value => console.log(value)} />
          <p>cenas</p>
          <hr />
          <FormControl component="fieldset">
            <FormLabel component="legend">Stops</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.nonStop}
                    onChange={this.handleChange('nonStop')}
                    value="nonStop"
                  />
                }
                label="No stops"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.oneStop}
                    onChange={this.handleChange('oneStop')}
                    value="oneStop"
                  />
                }
                label="One stop"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.twoStops}
                    onChange={this.handleChange('twoStops')}
                    value="twoStops"
                  />
                }
                label="Two stops"
              />
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
          </FormControl>
      </aside>
    );
  }
}

export default Sidebar;
