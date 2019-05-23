import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

  }

  addTotal() {
    const { cart } = this.props;
    let total = 0;
    for (var item of cart) {
      total += parseInt(item.price);
    }
    return (total / 100).toFixed(2);
  }

  changeHandler(evt) {
    const target = evt.target;
    target.name === 'name' && this.setState({ name: target.value });
    target.name === 'card' && this.setState({ creditCard: target.value });
    target.name === 'address' && this.setState({ shippingAddress: target.value });
  }

  clickHandler() {
    this.props.goBack('catalog', {});
  }

  placeOrder() {
    this.props.placeOrder(this.state);
  }

  render() {
    return (
      <div>
        <h3>Checkout</h3>
        <h5>Order Total: ${ this.addTotal() }</h5>
        <label>Name</label>
        <div className="form-group mb-3">
          <input className="form-control" name='name' type="text" onChange={ this.changeHandler } value={this.state.name} />
        </div>
        <label>Credit Card</label>
        <div className="form-group mb-3">
          <input className="form-control" name='card' type="text" onChange={ this.changeHandler } value={this.state.creditCard}/>
        </div>
        <label>Shipping Address</label>
        <div className="form-group mb-3">
          <textarea className='form-control' name='address' rows='4' onChange={ this.changeHandler } value={this.state.shippingAddress}></textarea>
        </div>
        <div className="checkoutContainer mt-4">
          <div className='backText mb-2' onClick={ this.clickHandler }><i className="fas fa-long-arrow-alt-left"></i> Back to catalog</div>
          <button className='checkoutBtn btn-outline-primary btn btn-lg' onClick={ this.placeOrder } >Checkout</button>
        </div>

      </div>
    );
  }
}

export default CheckoutForm;
