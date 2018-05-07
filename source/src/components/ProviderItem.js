import React from "react";

export default ({provider,link,price}) => (
  <li>
    <a href={link} target="_BLANK">
      <span>{provider}</span>
      <span>{price}</span>
    </a>
  </li>
)
