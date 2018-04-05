import React, { Component } from 'react';
import FlightItem from './FlightItem';
import HotelItem from './HotelItem';
import ReactPaginate from 'react-paginate';
import lang from "../lang";

class ResultsList extends Component {
  render() {
    let noResults = lang[this.props.lang].Results.noResultsFilter;
    let unfilteredItems = [];

    if (this.props.type === "flights") {
      unfilteredItems = this.props.flights.map((flight,index) =>
        <FlightItem
        key={index}
        lang={this.props.lang}
        currency={this.props.currency}
        info={this.props.info}
        {...flight}
      /> );
      unfilteredItems = this.props.stops.length
        ? unfilteredItems.filter(item => this.props.stops.find(stop => item.props.legs && item.props.legs.find(leg => leg.stopoverCode === stop)))
        : unfilteredItems;
      unfilteredItems = this.props.airlines.length
        ? unfilteredItems.filter(item => this.props.airlines.find(airline => item.props.legs && item.props.legs.find(leg => leg.airlineCodes.find(code => code === airline))))
        : unfilteredItems;
      unfilteredItems = unfilteredItems.filter(item => this.props.priceMin <= item.props.bestPrice && item.props.bestPrice <= this.props.priceMax);
      unfilteredItems = unfilteredItems.filter(item => this.props.durationMin <= item.props.duration && item.props.duration <= this.props.durationMax);
    } else {
      unfilteredItems = this.props.hotels.map((hotel,index) =>
        <HotelItem
          key={index}
          lang={this.props.lang}
          currency={this.props.currency}
          rates={this.props.gotRates && this.props.rates.filter(rate => rate.hotelId === hotel.id)}
          info={this.props.info}
          gotRates={this.props.gotRates}
          {...hotel}
        /> )
        if (this.props.gotRates) {
          unfilteredItems = unfilteredItems.filter(item => item.props.rates.length);
          unfilteredItems = this.props.stars.length
            ? unfilteredItems.filter(item => this.props.stars.find(star => parseInt(star,10) === item.props.star))
            : unfilteredItems;
          unfilteredItems = this.props.propertyTypes.length
            ? unfilteredItems.filter(item => this.props.propertyTypes.find(propertyTypes => parseInt(propertyTypes,10) === item.props.propertyTypeId))
            : unfilteredItems;
          unfilteredItems = this.props.districts.length
            ? unfilteredItems.filter(item => this.props.districts.find(districts => parseInt(districts,10) === item.props.districtId))
            : unfilteredItems;
          unfilteredItems = this.props.hotelName.length
            ? unfilteredItems.filter(item => item.props.name.match(new RegExp(this.props.hotelName, 'gi')))
            : unfilteredItems;
          unfilteredItems = this.props.amenities.length
            ? unfilteredItems.filter(item => item.props.amenityIds.includes(...this.props.amenities))
            : unfilteredItems;
          unfilteredItems = unfilteredItems.filter(item => this.props.priceMin <= item.props.bestPrice && item.props.bestPrice <= this.props.priceMax);
        }
    }
    // TODO: send unfilteredItems.length para Results
    if (this.props.currentItems !== unfilteredItems.length) this.props.getCurrentItems(unfilteredItems.length);
    //pagination
    const {currentPage, itemsPerPage} = this.props;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const renderItems = unfilteredItems.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <section className="resultsList">
        <i className="openFilters icon-filter" onClick={this.props.toggleFilters}></i>
        {renderItems.length ? renderItems : <p className="noResults">{noResults}</p>}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={Math.ceil(unfilteredItems.length/this.props.itemsPerPage)}
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
