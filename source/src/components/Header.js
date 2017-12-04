import React from "react";

export default(props) => (
  <header data-theme={props.history.location.pathname === "/" ? "white" : ""} data-position={props.history.location.pathname === "/" ? "absolute" : ""}>
    <a href="/" className="trippur"></a>
    <nav>
      <ul>
        <li>
          <a href="">Help</a>
        </li>
        <li>
          <a href=""><img src="http://www.geonames.org/flags/s/pt.png" alt="Portugues"/></a>
        </li>
      </ul>
    </nav>
  </header>
)
