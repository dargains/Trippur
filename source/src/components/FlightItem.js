import React from 'react';

const FlightItem = (props) => {
  const {
    id,
    departure_code,
    departure_name,
    departure_state_code,
    departure_country_code,
    departure_country_name,
    arrival_code,
    arrival_name,
    arrival_city,
    arrival_country_code,
    arrival_country_name,
    outbound_date,
    inbound_date,
    trip_type
  } = props
  return (
    <p>{departure_code}</p>
  )
}
export default FlightItem;
