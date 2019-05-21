import React from 'react';
import ProductListItem from './product-list-item';

export default function ProductList(props) {
  const productArray = props.products.map(product => {
    return <ProductListItem detail={ props.view } key={ product.id } product={ product } addHandler={ props.addHandler } />;
  });

  return (
    <div className="row">
      {productArray}
    </div>
  );
}
