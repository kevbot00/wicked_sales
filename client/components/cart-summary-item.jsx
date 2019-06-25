import React from 'react';

function CartSummaryItem(props) {
  const { item } = props;

  return (

    <div className="mt-4 row fakeCard">
      <div className="col-12 col-sm-4 col-md-4 px-0">
        <img src={item.image} className="card-img cardImg cartImg"/>
      </div>
      <div className="col-8">
        <h5 className="mt-4">{item.name}</h5>
        <p>${((item.price) / 100).toFixed(2)}</p>
        <p>{item.shortDescription}</p>
      </div>
    </div>
  );
}

export default CartSummaryItem;
