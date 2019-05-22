import React from 'react';

function CartSummaryItem(props) {
  const { item } = props;

  return (
    <div className="cartItemContainer">
      <div className="cartItemCard">
        <div>{item.name}</div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
