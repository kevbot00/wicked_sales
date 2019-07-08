import React from 'react';

export default function Header(props) {
  return (
    <div className='header-container'>
      <div className='header' onClick={ () => props.setView( 'catalog', {} )}>
        <h1 className='text-left ml-sm-4 ml-2 mt-2 header-cart'><i className="fas fa-bicycle mr-3 d-sm-inline-block d-none header-cart" ></i>CYCLER</h1>
      </div>
      <div className='shoppingCart'>
        <span className='itemCount mr-2 d-none d-sm-block'>{ props.cartItemCount ? `${props.cartItemCount} items` : null }</span>
        <span>
          <div className="cart-icon-container">
            <i className="fas fa-shopping-cart fa-2x ml-2 cart-icon" onClick={ () => props.setView('cart', {})}></i>
            { props.cartItemCount 
              ? <span className="badge badge-notify d-sm-none d-block cart-icon-badge" onClick={ () => props.setView('cart', {})}>{props.cartItemCount}</span>
              : null
            }
          </div>
          
        </span>
      </div>
    </div>
  );
}
