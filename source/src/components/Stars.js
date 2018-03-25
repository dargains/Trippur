import React from 'react';

export default({stars}) => (
  <ul data-rating={stars.code}>
    <li className="icon-star-full"></li>
    <li className="icon-star-full"></li>
    <li className="icon-star-full"></li>
    <li className="icon-star-full"></li>
    <li className="icon-star-full"></li>
  </ul>
);
