import React from "react";

export default (props) => (
	<section className="sort">
    <div className="wrapper">
      <ul>
        <li onClick={props.handleRating}>Rating</li>
        <li onClick={props.handlePopularity}>Popularity</li>
        <li onClick={props.handlePrice} className="selected">Price<span className="icon-triangle-up" /></li>
      </ul>
    </div>
	</section>
)
