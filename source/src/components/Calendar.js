import React from "react";

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

export default (props) => (
  <InfiniteCalendar
    className="datePicker"
    width={"100%"}
    height={300}
    Component={withRange(Calendar)}
    selected={props.selected}
    minDate={moment().toDate()}
    displayOptions={{

      showHeader: false
    }}
    onSelect= {props.onSelect}
    theme={theme}
  />
)
