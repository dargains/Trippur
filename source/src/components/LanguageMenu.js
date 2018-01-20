import React, { Component } from "react";

import EN from "../images/uk.png";
import PT from "../images/pt.png";

class LanguageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeLang = this.changeLang.bind(this);
  }
  componentWillMount() {
    this.setState({lang:this.props.lang})
  }
  toggleMenu() {
    this.setState({show:!this.state.show})
  }
  changeLang(event) {
    this.props.changeLang(event.currentTarget.dataset.lang);
    this.toggleMenu();
  }
  render() {
    const flags = {
      en: EN,
      pt: PT
    }
    return (
      <div className="langSelector">
        <p onClick={this.toggleMenu}><img src={flags[this.props.lang]} alt="Portugues"/><i className="icon-triangle-down"></i></p>
        {
          this.state.show &&
          <ul>
            <li onClick={this.changeLang} data-lang="pt"><img src={flags.pt} alt="Portugues"/> Português</li>
            <li onClick={this.changeLang} data-lang="en"><img src={flags.en} alt="English"/> English</li>
          </ul>
        }
      </div>
    )
  }
}

export default LanguageMenu;
