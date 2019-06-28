import React from './node_modules/react';
import ProductListItem from './product-list-item';

export default function ProductList(props) {
  const productArray = props.products.map(product => {
    return <ProductListItem detail={ props.view } key={ product.id } product={ product } addHandler={ props.addHandler } />;
  });

  return (
    <div className="row d-flex justify-content-center">
      {productArray}
    </div>
  );
}
