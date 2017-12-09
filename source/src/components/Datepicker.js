import React, { Component } from "react";

import moment from "moment";
import InfiniteCalendar, {withRange, Calendar} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';


class Datepicker extends Component {
  render() {
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
    const locale = {
      locale: require(`date-fns/locale/${this.props.lang}`),
      headerFormat: 'dddd, D MMM',
      weekdays: ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],
      blank: 'Aucune date selectionnee',
      todayLabel: {
       long: 'Aujourd\'hui',
       short: 'Auj.'
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
