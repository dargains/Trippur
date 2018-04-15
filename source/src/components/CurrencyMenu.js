import React, { Component } from "react";
import lang from "../lang";

class CurrencyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
  }
  componentWillMount() {
    this.setState({currency:this.props.currency})
  }
  toggleMenu() {
    this.setState({show:!this.state.show})
  }
  changeCurrency(event) {
    this.props.changeCurrency(event.currentTarget.dataset.currency);
    this.toggleMenu();
  }
  render() {
    const currencyLang = lang[this.props.lang].Currency;
    return (
      <div className="langSelector">
        <p onClick={this.toggleMenu}>{this.props.currency}<i className="icon-triangle-down"></i></p>
        {
          this.state.show &&
          <ul>
            <li onClick={this.changeCurrency} data-currency="EUR">{currencyLang["EUR"].name}</li>
            <li onClick={this.changeCurrency} data-currency="USD">{currencyLang["USD"].name}</li>
            <li onClick={this.changeCurrency} data-currency="GBP">{currencyLang["GBP"].name}</li>
            <li onClick={this.changeCurrency} data-currency="BRL">{currencyLang["BRL"].name}</li>
          </ul>
        }
      </div>
    )
  }
}

export default CurrencyMenu;
