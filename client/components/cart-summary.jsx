import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);

  }

  viewCart() {
    const shoppingCart = this.props.cart.map(item => <CartSummaryItem key={ item.id } item={item}/>);
    return shoppingCart;
  }

  clickHandler() {
    this.props.goBack('catalog', {});
  }

  render() {
    return (
      <div className="cartSummaryContainer container-fluid">
        <div className='backText mb-4' onClick={ this.clickHandler }><i className="fas fa-long-arrow-alt-left"></i> Back to catalog</div>
        <h3>My Cart</h3>
        { this.viewCart() }
      </div>
    );
  }
}

export default CartSummary;
