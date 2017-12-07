import React from "react";
import { Link } from "react-router-dom";

export default(props) => (
  <header data-theme={props.history.location.pathname === "/" ? "white" : ""} data-position={props.history.location.pathname === "/" ? "absolute" : ""}>
    <Link to="/" className="trippur"></Link>
    <nav>
      <ul>
        <li>
          <Link to="/Pages/Help">Help</Link>
        </li>
        <li>
          <a href=""><img src="http://www.geonames.org/flags/s/pt.png" alt="Portugues"/></a>
        </li>
      </ul>
    </nav>
  </header>
)
