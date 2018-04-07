import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import LanguageMenu from "./LanguageMenu";
import lang from "../lang";

class Header extends Component {
  render() {
    return (
      <header data-theme={this.props.history.location.pathname === "/" ? "white" : ""} data-position={this.props.history.location.pathname === "/" ? "absolute" : ""}>
        <Link to="/" className="trippur"></Link>
        <nav>
          <ul>
            <li>
              <Link to="/Help">{lang[this.props.lang].Header.help}</Link>
            </li>
            <li>
              <a href="http://guides.trippur.com">{lang[this.props.lang].Header.guides}</a>
            </li>
            <li>
              <a href="http://blog.trippur.com">{lang[this.props.lang].Header.blog}</a>
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
