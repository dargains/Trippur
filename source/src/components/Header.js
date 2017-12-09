import React, { Component } from "react";
import { Link } from "react-router-dom";

import LanguageMenu from "./LanguageMenu";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header data-theme={this.props.history.location.pathname === "/" ? "white" : ""} data-position={this.props.history.location.pathname === "/" ? "absolute" : ""}>
      <Link to="/" className="trippur"></Link>
      <nav>
        <ul>
          <li>
            <Link to="/Pages/Help">Help</Link>
          </li>
          <li>
            <LanguageMenu />
          </li>
        </ul>
      </nav>
    </header>

    )
  }
}

export default Header;
