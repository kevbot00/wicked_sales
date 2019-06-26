import React from 'react';

function CartSummaryItem(props) {
  const { item } = props;
  
  console.log( item )
  return (
    <div className="mt-4 row fakeCard">
      <div className="col-sm-4 col-md-4 px-0">
        <img src={item.image} className="card-img cardImg cartImg"/>
      </div>
      <div className="col-sm-8 pt-4 pl-4">
        <h5 className="d-inline">{item.name}</h5>
        <p className="float-right d-inline">Quantity: {item.quantity}</p>
        
        <p>${((item.price) / 100).toFixed(2)}</p>
        <p>{item.shortDescription}</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;
