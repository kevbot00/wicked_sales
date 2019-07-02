import React from 'react';
import CartSummaryItem from './cart-summary-item';
import image from '../images/empty.png';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  viewCart() {
    const shoppingCart = this.props.cart.map( item => <CartSummaryItem key={ item.id } item={item} save={ this.props.save } delete={ this.props.delete} getDetail={ this.props.goBack }/>);
    return shoppingCart;
  }

  clickHandler( evt ) {
    this.props.goBack('catalog', {});
  }

  addTotal() {
    const { cart } = this.props;
    let total = 0;
    for (var item of cart) {
      total += item.price * item.quantity;
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
      <>
        <span className='backText' onClick={ this.clickHandler }><i className="fas fa-long-arrow-alt-left "></i> Back to catalog</span>
        <h3 className="mt-2">Cart</h3>
        { this.viewCart() }
        { this.props.cart.length 
          ? <div className='checkoutContainer mx-2 my-4 d-flex justify-content-between'>
              <h3 className='itemDisplay'>Item Total: ${ this.addTotal() }</h3>
              <button style={{'zIndex': '1'}} className='checkoutBtn btn-outline-primary btn btn-lg d-block ml-2' onClick={ this.placeOrder } >Checkout</button>
            </div>
          : <div className="text-center">
              <img className="h-50 w-50 mb-4" style={{'WebkitUserSelect': 'none'}} src={image} />
              <h5 className="mt-4">No Items Found!</h5>
              <i>Sorry, mate, no items found inside your cart</i>
            </div>
        
        }

      </>
    );
  }
}

export default CartSummary;
