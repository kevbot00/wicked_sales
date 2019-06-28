import React from 'react';
import CreditModal from './credit-card-modal';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      card: '1234 4567 8910 1112',
      street: '',
      city: '',
      usState: '',
      zip: '',
      showModal: false
    };
    this.states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
    this.clickHandler = this.clickHandler.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    
  }

  toggleModal() { 
    this.setState({
    showModal: !this.state.showModal
    })
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
    const target = evt.target
    if (target.name === "firstName") return this.setState({ firstName: target.value });
    if (target.name === "lastName") return this.setState({ lastName: target.value });
    if (target.name === "email") return this.setState({ email: target.value });
    // if (target.name === "card") return this.setState({ card: target.value });
    if (target.name === "street") return this.setState({ street: target.value });
    if (target.name === "city") return this.setState({ city: target.value});
    if (target.name === "state") return this.setState({ usState: target.value });
    if (target.name === "zip") return this.setState({ zip: target.value} );
  }

  clickHandler() {
    this.props.goBack('catalog', {});
  }

  placeOrder() {
    console.log( this.props.cart );
    const order = {
      name: `${this.state.firstName} ${this.state.lastName}`,
      email: this.state.email,
      card: this.state.card,
      street: this.state.street,
      city: this.state.city,
      usState: this.state.usState,
      zip: this.state.zip,
      cart: this.props.cart

    }
    this.props.placeOrder( order );
  }

  render() {
    const cart = this.props.cart.map( ( item, id ) => {
      return <li className="list-group-item" key={id}>
        {item.name} 
        <span className="text-primary">{ item.quantity ? ` x ${item.quantity}` : null}</span>
        <span className="float-right text-muted">
          ${ (item.price * item.quantity / 100 ).toFixed(2) }
        </span>
      </li> 
      });
    const states = this.states.map((state, id) => <option key={id} value={state}>{state}</option>)
    return (
      <div className={`container-fluid ${this.state.showModal ? 'modal-open' : ''}`}>
        <div className='backText mb-2' onClick={this.clickHandler}><i className="fas fa-long-arrow-alt-left"></i> Back to catalog</div>
        <h3 className="d-block">Checkout</h3>
        <div className="row">
          <h4 className="d-inline-block col-lg-8">Billing Address</h4>
          <h4 className="d-inline-block col-lg-4">Your cart</h4>
          {/* Add badge */}
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" className="form-control" id="firstName" placeholder="First Name" onChange={ this.changeHandler } value={this.state.firstName}/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" className="form-control" id="lastName" placeholder="Last Name" onChange={ this.changeHandler } value={this.state.lastName}/>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className="form-control" id="email" placeholder="you@example.com" onChange={ this.changeHandler } value={this.state.email}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="creditCard">Credit Card</label>
              <input type="text" name="card" className="form-control" id="creditCard" onChange={ this.changeHandler } onClick={this.toggleModal} value={this.state.card}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" name="street" className="form-control" id="address" placeholder="1234 Main Street" onChange={ this.changeHandler } value={this.state.street}/>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" name="city" className="form-control" id="inputCity" onChange={ this.changeHandler } value={this.state.city}/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select id="inputState"  className="form-control" name="state" onChange={ this.changeHandler }>
                  <option>Choose...</option>
                  {states}
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" name="zip" className="form-control" id="inputZip" onChange={ this.changeHandler } value={this.state.zip}/>
              </div>
            </div>
          </div>
          {/* Cart */}
          <div className="col-lg-4">
            <div className="card checkoutCartContainer">
              <ul className="list-group list-group-flush ">
                { cart }
              </ul>
            </div>
            <div className="card-footer checkout-footer">Total (USD) <span className="float-right text-dark">${ this.props.total }</span></div>
            <button type="button" className="mt-sm-4 mb-4 mb-0-sm btn btn-primary btn-lg btn-block" onClick={ this.placeOrder } >Checkout</button>
          </div>
        </div>
        {/* Modal */}
        <CreditModal toggle={ this.toggleModal } showModal={this.state.showModal} />
      </div>
    );
  }
}

export default CheckoutForm;
