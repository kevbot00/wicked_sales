import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.placeOrder = this.placeOrder.bind(this);

  }

  viewCart() {
    const shoppingCart = this.props.cart.map((item, itemId) => <CartSummaryItem key={ itemId } item={item} />);
    return shoppingCart;
  }

  clickHandler() {
    this.props.goBack('catalog', {});
  }

  addTotal() {
    const { cart } = this.props;
    let total = 0;
    for (var item of cart) {
      total += parseInt(item.price);
    }
    return (total / 100).toFixed(2);
  }

  placeOrder() {
    if (this.props.cart.length) {
      this.props.goBack('checkout', {totalAmount: this.addTotal()});
    }
  }

  render() {
    return (
      <div className="">
        <div className='backText mb-2' onClick={ this.clickHandler }><i className="fas fa-long-arrow-alt-left"></i> Back to catalog</div>
        <h3>My Cart</h3>
        { this.viewCart() }
        <div className='checkoutContainer mx-2 my-4 d-flex justify-content-between'>
          <h3 className='itemDisplay'>Item Total: ${ this.addTotal() }</h3>
          <button className='checkoutBtn btn-outline-primary btn btn-lg d-block' onClick={ this.placeOrder } >Checkout</button>
        </div>
      </div>
    );
  }
}

export default CartSummary;
