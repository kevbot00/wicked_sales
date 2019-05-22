import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.placeOrder = this.placeOrder.bind(this);

  }

  viewCart() {
    const shoppingCart = this.props.cart.map(item => <CartSummaryItem key={ item.id } item={item}/>);
    return shoppingCart;
  }

  clickHandler() {
    this.props.goBack('catalog', {});
  }

  addTotal() {
    const { cart } = this.props;
    let total = 0;
    for (var item of cart) {
      total += item.price;
    }
    return (total / 100).toFixed(2);
  }

  placeOrder() {
    if (this.props.cart.length) {
      this.props.goBack('checkout', {});
    }
  }

  render() {
    return (
      <div className="cartSummaryContainer container">
        <div className='backText mb-4' onClick={ this.clickHandler }><i className="fas fa-long-arrow-alt-left"></i> Back to catalog</div>
        <h3>My Cart</h3>
        { this.viewCart() }
        <h3 className='mt-4'>Item Total: ${ this.addTotal() }</h3>
        <button onClick={ this.placeOrder } >Checkout</button>

      </div>
    );
  }
}

export default CartSummary;
