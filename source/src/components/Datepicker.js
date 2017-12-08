import React, { Component } from "react";

import moment from "moment";
import InfiniteCalendar, {withRange, Calendar} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

const theme = {
  selectionColor: '#FFA726',
  accentColor: '#FF8706',
  textColor: {
    default: '#333',
    active: '#FFF'
  },
  weekdayColor: '#FFA726',
  floatingNav: {
    background: '#FF8706',
    color: '#FFF',
    chevron: '#FFA726'
  }
}

class Datepicker extends Component {
  render() {
    return (
      this.props.oneWay
      ? <InfiniteCalendar
        className="datePicker"
        width={"100%"}
        height={305}
        selected={this.props.selected}
        minDate={moment().toDate()}
        displayOptions={{
          showHeader: false
        }}
        onSelect= {this.props.onSelect}
        theme={theme}
      />
      : <InfiniteCalendar
        className="datePicker"
        width={"100%"}
        height={305}
        Component={withRange(Calendar)}
        selected={this.props.selected}
        minDate={moment().toDate()}
        displayOptions={{
          showHeader: false
        }}
        onSelect= {this.props.onSelect}
        theme={theme}
      />
    )
  }
}

export default Datepicker;
