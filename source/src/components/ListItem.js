import React, { Component } from "react";

class ListItem extends Component {
  constructor(props){
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  render() {
    return(
      <li
        ref={this.setWrapperRef}
        key={this.props.id}
        data-id={this.props.id}
        data-countrycode={this.props.countrycode}
        data-countryname={this.props.countryname}
        onClick={this.props.onClick}>
        {this.props.name}
      </li>
    )
  }
}

export default ListItem;
