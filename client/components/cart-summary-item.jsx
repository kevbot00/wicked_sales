import React from 'react';

function CartSummaryItem(props) {
  const { item } = props;

  return (
    <div className="card">
      <div className="card-body">
        <div className='cart-title'>{item.name}</div>
        <div className='card-text'>${((item.price) / 100).toFixed(2)}</div>
        <div className='card-text'>{item.shortDescription}</div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
