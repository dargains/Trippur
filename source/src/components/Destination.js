import React from "react";
import { Link } from "react-router-dom";

export default(props) => (
  <li>
    <Link to={props.link}>
      <figure>
        <img src={props.image}/>
        <figcaption>{props.caption}</figcaption>
      </figure>
    </Link>
  </li>
)
