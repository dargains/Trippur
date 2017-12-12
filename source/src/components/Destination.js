import React from "react";
import { Link } from "react-router-dom";

export default(props) => (
  <li onClick={props.handleClick} data-destination={props.caption}>
    <Link to={props.link}>
      <figure>
        <img src={props.image} alt={props.caption}/>
        <figcaption>{props.caption}</figcaption>
      </figure>
    </Link>
  </li>
)
