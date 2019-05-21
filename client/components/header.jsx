import React from 'react';

export default function Header(props) {
  return (
    <div className='header-container mb-4'>
      <div className='header'>
        <h1 className='text-left ml-4'><i className="fas fa-fist-raised mr-3"></i>Wicked Sales</h1>
      </div>
      <div className='shoppingCart'>
        <span className='itemCount mr-4'>{ props.cartItemCount.length ? `${props.cartItemCount.length} items` : null }</span>
        <span>
          <i className="fas fa-shopping-cart fa-2x ml-2"></i>
        </span>
      </div>
    </div>
  );
}
