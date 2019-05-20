import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className='col-md-4 col-sm-6'>
      <div className='card mb-2'>
        <img className='card-img border-bottom cardImg' src={props.product.image} alt=""/>
        <div className='card-body'>
          <h5 className='card-title'>{ props.product.name }</h5>
          <p className='card-text'>${ (props.product.price / 100).toFixed(2)}</p>
          <p className='card-text'>{ props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
