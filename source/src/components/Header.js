import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import LanguageMenu from "./LanguageMenu";
import lang from "../lang";

class Header extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <header data-theme={this.props.history.location.pathname === "/" ? "white" : ""} data-position={this.props.history.location.pathname === "/" ? "absolute" : ""}>
        <Link to="/" className="trippur"></Link>
        <nav>
          <ul>
            <li>
              <Link to="/Pages/Help">{lang[this.props.lang].Header.help}</Link>
            </li>
            <li>
              <LanguageMenu changeLang={this.props.changeLang} lang={this.props.lang}/>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default withRouter(Header);
