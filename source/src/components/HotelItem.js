import React, { Component } from 'react';
import lang from "../lang";

import genericHotel from "../images/hotel.png";

class HotelItem extends Component {
  render() {
    const currencySymbol = lang[this.props.lang].Currency[this.props.currency].symbol;
    return (
      <article className="hotelItem" id={this.props.id}>
        {/* <figure>
          <img src={this.props.imagesCount ? this.props.images[0].url : ""} alt={this.props.name}/>
        </figure> */}
        <div className="figure" style={{backgroundImage:`url(${this.props.imagesCount ? this.props.images[0].url : genericHotel})`}}></div>
        <div className="center">
          <div className="hotelHeader">
            <h2>{this.props.name}</h2>
            <ul data-rating={this.props.star}>
              <li className="icon-star-full"></li>
              <li className="icon-star-full"></li>
              <li className="icon-star-full"></li>
              <li className="icon-star-full"></li>
              <li className="icon-star-full"></li>
            </ul>
            <p>({this.props.reviewsCount ? this.props.reviewsCount : lang[this.props.lang].Item.hotels.noReviews} {lang[this.props.lang].Item.hotels.reviews})</p>
          </div>
          <div className="hotelList">
            {
              this.props.rates &&
              <ul>
                {this.props.rates.map((rate,index) => <li key={index}><a href={`${rate.handoffUrl}&ts_code=18109&client_id=0dd3120d9b4aa89a92aff5a7`} target="_blank"><span>{currencySymbol}{rate.price.amount}</span> {rate.providerCode}</a></li>)}
              </ul>
            }
          </div>
        </div>
        <aside className="right">
          {
            this.props.bestRate &&
            <div className="hotelPriceContainer">
              <p className="hotelPrice">
                {currencySymbol}{this.props.bestRate.price.amount}
                <span>{this.props.bestRate.providerCode}</span>
              </p>
              <p className="btn" onClick={() => window.open(`${this.props.bestRate.handoffUrl}&ts_code=18109&client_id=0dd3120d9b4aa89a92aff5a7`)}><span>{lang[this.props.lang].Item.hotels.deal}</span></p>
            </div>
          }
        </aside>
      </article>
    )
  }
}

export default HotelItem;
