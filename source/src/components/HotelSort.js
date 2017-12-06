import React from "react";

export default (props) => (
	<section className="sort">
    <div className="wrapper">
      <ul>
				<li onClick={props.handleClick} data-sort="popularity" className="selected asc">Popularity</li>
				<li onClick={props.handleClick} data-sort="price">Price</li>
        <li onClick={props.handleClick} data-sort="stars">Stars</li>
      </ul>
    </div>
	</section>
);
