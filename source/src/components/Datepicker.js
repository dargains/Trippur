import React, { Component } from "react";

import moment from "moment";
import InfiniteCalendar, {withRange, Calendar} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import lang from "../lang";

class Datepicker extends Component {
  render() {
    const theme = {
      selectionColor: '#47A594',
      accentColor: '#177564',
      textColor: {
        default: '#484848',
        active: '#FFF'
      },
      weekdayColor: '#47A594',
      floatingNav: {
        background: '#177564',
        color: '#FFF',
        chevron: '#47A594'
      }
    }
    const locale = {
      locale: require(`date-fns/locale/${this.props.lang}`),
      weekdays: lang[this.props.lang].DatePicker.weekdays,
      todayLabel: {
       long: lang[this.props.lang].DatePicker.today,
       short: lang[this.props.lang].DatePicker.today
      }
    }
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
        locale={locale}
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
        locale={locale}
      />
    )
  }
}

export default Datepicker;
