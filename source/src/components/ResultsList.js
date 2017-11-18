import React from 'react';
import FlightItem from './FlightItem';
import HotelItem from './HotelItem';

class ResultsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightsResponse: {
        "id": "T5dJTxtxQv-uQ6OuYtaWkw",
        "key": "[SYD:LON:2014-01-24:2014-01-29]~1~0~XX~SG",
        "trips": [
            {
                "id": "SYD:LON:2014-01-24:2014-01-29",
                "departure_code": "SYD",
                "departure_name": "Sydney",
                "departure_state_code": "NSW",
                "departure_country_code": "AU",
                "departure_country_name": "Australia",
                "arrival_code": "LON",
                "arrival_name": "London",
                "arrival_city": true,
                "arrival_country_code": "GB",
                "arrival_country_name": "United Kingdom",
                "outbound_date": "2014-01-24",
                "inbound_date": "2014-01-29",
                "trip_type": "standard"
            }
        ],
        "cabin": "economy",
        "adults_count": 1,
        "country_site_code": "XX",
        "user_country_code": "SG",
        "created_at": "2014-01-24T12:51:59.050+08:00"
    }

    };
  }
  render() {
    const flightItems = this.state.flightsResponse.trips.map((trip, index) =>
      <FlightItem key={index} {...trip}/>
    );
    console.log(this.props)
    const hotelItems = this.props.locations.map((trip, index) =>
      <HotelItem key={index} {...trip}/>
    );
    return (
      <section className="resultsList">
        {flightItems}
        {hotelItems}
      </section>
    );
  }
}

export default ResultsList;
