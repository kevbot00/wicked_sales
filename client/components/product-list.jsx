import React from 'react';
import ProductListItem from './product-list-item';
import Image from '../images/header.jpg';

export default function ProductList(props) {
  const productArray = props.products.map(product => {
    return <ProductListItem detail={ props.view } key={ product.id } product={ product } addHandler={ props.addHandler } />;
  });

  return (
    <div className="p-0">
      <div className="product-list-header-img mb-4"  style={{'backgroundImage': `url(${Image})`}} alt="">
        <div className="product-list-header-title">
          Ride bikes. Have fun. Feel Good.
        </div>
      </div>

      <div className="product-list-section row d-flex justify-content-center m-0">
        {productArray}
      </div>
    </div>
  );
}
