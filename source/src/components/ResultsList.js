import React from 'react';
import FlightItem from './FlightItem';
import HotelItem from './HotelItem';
import ReactPaginate from 'react-paginate';

class ResultsList extends React.Component {
  render() {
    let items;
    this.props.type === "flights"
      ? items = this.props.routes.map(flight =>
        <FlightItem
        key={flight.id}
        lang={this.props.lang}
        currency={this.props.currency}
        {...flight}
      /> )
      : items = this.props.hotels.map(hotel =>
        <HotelItem
          key={hotel.id}
          lang={this.props.lang}
          currency={this.props.currency}
          onRateClick={this.props.onRateClick}
          {...hotel}
        /> );
    return (
      <section className="resultsList">
        <i className="openFilters icon-filter" onClick={this.props.toggleFilters}></i>
        {items}
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
