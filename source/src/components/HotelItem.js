import React, { Component } from 'react';
import lang from "../lang";

class HotelItem extends Component {
  getBestRate() {
    const bestValue = Math.min(...this.props.rates.map(rate => rate.price.amount));
    const bestRate = this.props.rates.filter(rate => rate.price.amount === bestValue)[0];
    this.props.updateHotelBestRate(this.props.id, bestRate);
    return bestRate;
  }
  render() {
    //const bestRate = this.props.gotRates && this.getBestRate();
    return (
      <article className="hotelItem" id={this.props.id}>
        <figure>
          <img src={this.props.imagesCount ? this.props.images[0].url : ""} alt={this.props.name}/>
        </figure>
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
            <p>{this.props.satisfaction_description} ({this.props.reviews ? this.props.reviews.reduce((a, b) => a + b.count, 0) : "No"} {lang[this.props.lang].Item.hotels.reviews})</p>
          </div>
          <div className="hotelList">
            {
              this.props.rates &&
              <ul>
                {this.props.rates.map((rate,index) => <li key={index}><a href={rate.handoffUrl} target="_blank"><span>€{rate.price.amount}</span> {rate.providerCode}</a></li>)}
              </ul>
            }
          </div>
        </div>
        <aside className="right">
          {
            this.props.bestRate &&
            <div className="hotelPriceContainer">
              <p className="hotelPrice">
                {this.props.currency}{this.props.bestRate.price.amount}
                <span>{this.props.bestRate.providerCode}</span>
              </p>
              <p className="btn" onClick={() => window.open(this.props.bestRate.handoffUrl)}><span>{lang[this.props.lang].Item.hotels.deal}</span></p>
            </div>
          }
        </aside>
      </article>
    )
  }
}

export default HotelItem;
