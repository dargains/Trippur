import React from 'react';

const HotelItem = (props) => {
  return (
    <article>
      <p>{props.name}</p>
      <p>{props.address}</p>
      <p>{props.desc}</p>
    </article>
  )
}
export default HotelItem;
