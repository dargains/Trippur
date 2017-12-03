import React from 'react';
import FlightItem from './FlightItem';
import HotelItem from './HotelItem';
import ReactPaginate from 'react-paginate';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    let items,
    that = this;
    console.log(this.props);
    this.props.type === "flights"
      ? items = this.props.routes.map(flight => <FlightItem key={flight.id} {...flight}/> )
      : items = this.props.hotels.map(hotel => <HotelItem key={hotel.id} {...hotel} onRateClick={that.props.onRateClick}/> );
    return (
      <section className="resultsList">
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
