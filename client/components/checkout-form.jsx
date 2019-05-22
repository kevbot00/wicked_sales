import React from 'react';

class CheckoutForm extends React.Component {

  addTotal() {
    const { cart } = this.props;
    let total = 0;
    for (var item of cart) {
      total += item.price;
    }
    return (total / 100).toFixed(2);
  }

  render() {
    return (
      <div>
        <h3>Checkout</h3>
        <h5>Order Total: ${ this.addTotal() }</h5>
        <label>Name</label>
        <div className="input-group mb-3">
          <input className="form-control" type="text"/>
        </div>
        <label>Credit Card</label>
        <div className="input-group mb-3">
          <input type="text"/>
        </div>
        <label>Shipping Address</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    );
  }
}

export default CheckoutForm;
