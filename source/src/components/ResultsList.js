import React, { Component } from 'react';
import FlightItem from './FlightItem';
import HotelItem from './HotelItem';
import ReactPaginate from 'react-paginate';

class ResultsList extends Component {
  render() {
    const {currentPage, itemsPerPage} = this.props;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const items = this.props.type === "flights"
      ? this.props.routes
      : this.props.hotels;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    let renderItems = this.props.type === "flights"
      ? currentItems.map(flight =>
        <FlightItem
        key={flight.id}
        lang={this.props.lang}
        currency={this.props.currency}
        {...flight}
      /> )
      : currentItems.map((hotel,index) =>
        <HotelItem
          key={index}
          lang={this.props.lang}
          currency={this.props.currency}
          rates={this.props.rates && this.props.rates.filter(rate => rate.hotelId === hotel.id)}
          info={this.props.info}
          gotRates={this.props.gotRates}
          {...hotel}
        /> );
    if (this.props.gotRates) {
      renderItems = renderItems.filter(item => item.props.rates.length);
    }
    return (
      <section className="resultsList">
        <i className="openFilters icon-filter" onClick={this.props.toggleFilters}></i>
        {renderItems}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.props.pageCount}
          forcePage={this.props.currentPage - 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.props.handlePagination}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />
      </section>
    );
  }
}

export default ResultsList;
