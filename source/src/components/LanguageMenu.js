import React, { Component } from "react";

class LanguageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }
  toggleMenu() {
    this.setState({show:!this.state.show})
  }
  changeLang(event) {
    var newLang = event.currentTarget.dataset.lang;
    this.toggleMenu();
  }
  render() {
    return (
      <div className="langSelector">
        <p onClick={this.toggleMenu}><img src="http://www.geonames.org/flags/s/pt.png" alt="Portugues"/><i className="icon-triangle-down"></i></p>
        {
          this.state.show &&
        <ul>
          <li onClick={this.changeLang} data-lang="pt"><img src="http://www.geonames.org/flags/s/pt.png" alt="Portugues"/> Português</li>
          <li onClick={this.changeLang} data-lang="en"><img src="http://www.geonames.org/flags/s/uk.png" alt="English"/> English</li>
        </ul>
      }
      </div>
    )
  }
}

export default LanguageMenu;
