import React from 'react';

import InputRange from 'react-input-range';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import "react-input-range/lib/css/index.css";

function pad(n) {
  return (n < 10) ? ("0" + n) : n;
}

const styles = {
  checked: {
    color: "#FF5722",
  },
};

class FlightFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: {
        min: 150,
        max: 300
      },
      inbound: {
        min: 800,
        max: 1200
      },
      outbound: {
        min: 500,
        max: 700
      },
      nonStop: true,
      oneStop: false,
      twoStops: true,
      economy: false,
      business: true,
      firstClass: true,
    };
  }
  handleChange = name => (event, checked) => {
    this.setState({ [name]: checked });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Price</FormLabel>
            <InputRange
              maxValue={500}
              minValue={100}
              formatLabel={value => `${value}€`}
              value={this.state.price}
              onChange={price => this.setState({ price })}
              onChangeComplete={value => console.log(value)} />
        </FormControl>
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
                  classes={{
                    checked: classes.checked,
                  }}
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
                  classes={{
                    checked: classes.checked,
                  }}
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
                  classes={{
                    checked: classes.checked,
                  }}
                />
              }
              label="Two stops"
            />
          </FormGroup>
        </FormControl>
        <hr />
        <FormControl component="fieldset">
          <FormLabel component="legend">Times</FormLabel>
            <p className="flightLegend">Inbound - <span>LIS</span></p>
            <InputRange
              maxValue={1440}
              minValue={0}
              formatLabel={value => `${pad(Math.floor(value/60))}:${pad(value%60)}`}
              value={this.state.inbound}
              onChange={inbound => this.setState({ inbound })}
              onChangeComplete={value => console.log(value)} />
            <p className="flightLegend">Outbound - <span>LON</span></p>
            <InputRange
              maxValue={1440}
              minValue={0}
              formatLabel={value => `${pad(Math.floor(value/60))}:${pad(value%60)}`}
              value={this.state.outbound}
              onChange={outbound => this.setState({ outbound })}
              onChangeComplete={value => console.log(value)} />
          </FormControl>
          <hr />
          <FormControl component="fieldset">
            <FormLabel component="legend">Cabin</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.economy}
                    onChange={this.handleChange('economy')}
                    value="economy"
                    classes={{
                      checked: classes.checked,
                    }}
                  />
                }
                label="Economy"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.business}
                    onChange={this.handleChange('business')}
                    value="business"
                    classes={{
                      checked: classes.checked,
                    }}
                  />
                }
                label="Business"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.firstClass}
                    onChange={this.handleChange('firstClass')}
                    value="firstClass"
                    classes={{
                      checked: classes.checked,
                    }}
                  />
                }
                label="First Class"
              />
            </FormGroup>
          </FormControl>
          <hr />
          <FormControl component="fieldset">
            <FormLabel component="legend">Airlines</FormLabel>
          </FormControl>
      </div>
    );
  }
}

//export default Sidebar;
export default withStyles(styles)(FlightFilters);
