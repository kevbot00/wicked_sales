import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, HashRouter } from "react-router-dom";
import { Label, Input } from 'reactstrap';
import CreditModal from './credit-card-modal';
import { addTotal, formatPrice, addTax, addTotalAmount, getPrices } from './product-price';


class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      card: '1234 1234 1234 1234',
      expiration: '',
      cvv: '',
      street: '',
      city: '',
      usState: '',
      zip: '',
      showModal: false,
      errorHandler: {
        firstName: false,
        lastName: false,
        email: false,
        street: false,
        city: false,
        usState: false,
        zip: false,
      }
    };
    this.states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    this.placeOrder = this.placeOrder.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.expirationCheck = this.expirationCheck.bind(this);
    this.cvvCheck = this.cvvCheck.bind( this );
  }

  componentDidMount() {
    this.toggleModal();
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
    // FOR DEMO PURPOSES
    // if (target.name === "card") return this.setState({ card: target.value });
    if (target.name === "expiration") return this.expirationCheck( evt.key );
    if (target.name === 'cvv') return this.cvvCheck( evt.target.value );
    if (target.name === "street") return this.setState({ street: target.value });
    if (target.name === "city") return this.setState({ city: target.value });
    if (target.name === "state") return this.setState({ usState: target.value });
    if (target.name === "zip") return this.setState({ zip: target.value });
  }

  expirationCheck( value ){
    if ( !isNaN( value ) ){
      if ( this.state.expiration.length >= 7 ) return;
      this.state.expiration.length === 2
      ? this.setState({expiration: this.state.expiration + '/' + value })
      : this.setState({expiration: this.state.expiration + value })
    } else if ( value === 'Backspace'){
      this.state.expiration.length === 4 
      ? this.setState({expiration: this.state.expiration.slice( 0, this.state.expiration.length -2 )})
      : this.setState({expiration: this.state.expiration.slice( 0, this.state.expiration.length-1) })  
    }
  }

  cvvCheck( value ){
    if ( value.length > 3 ) return;
    if ( !isNaN( value ) ) return this.setState({ cvv: value });
  }

  checkInputValidity() {
    const { firstName, lastName, email, street, city, usState, zip } = this.state;
    if (firstName && lastName && email && street && city && usState && zip) {
      return true
    } 
    return false;
  }

  placeOrder() {
    const { firstName, lastName, email, card, street, city, usState, zip } = this.state;
    if (this.checkInputValidity()) {
      const order = {
        name: `${firstName} ${lastName}`,
        email: email,
        card: card,
        street: street,
        city: city,
        usState: usState,
        zip: zip,
        cart: this.props.cart
      }
      return this.props.placeOrder( order );
    }
    this.setState({
      errorHandler: {
        firstName: !Boolean(firstName),
        lastName: !Boolean(lastName),
        email: !Boolean(email),
        street: !Boolean(street),
        city: !Boolean(city),
        usState: !Boolean(usState),
        zip: !Boolean(zip),
      }
    })
    console.error('Something went wrong with the input field')
  }
  
  getOrder() {
    const order = this.props.cart.map((item, index) => {
      return (
        <li key={index} className="list-group-item px-0 py-0 pr-sm-2 border-bottom d-flex align-items-stretch" style={{ 'minHeight': '80px' }}>
          <img src={item.image} className="d-sm-block order-summary-img mr-3" alt="" />
          <div className="container-fluid checkout-cart ">
            <div className="row pl-1">
              <div className="checkout-cart-item-name pt-2">{item.name}</div>
            </div>
            <div className="row pl-1 ">
              <div className="checkout-cart-item-specs text-secondary">
                <span className="d-sm-block d-md-inline">Color / {item.specifications.color}</span>
                <span className='d-sm-none d-md-inline px-2'>|</span>
                <span className="d-sm-block d-md-inline">Size / {item.specifications.size}</span>
              </div>
            </div>
            <div className="row pl-1">
              <div className="checkout-cart-item-quantity text-secondary"> Qty: {item.quantity} @ ${formatPrice((item.price / 100).toFixed(2))}</div>
            </div>
            <div className="row pl-1">
              <div className="checkout-cart-item-price text-secondary">
                ${formatPrice(((item.price * item.quantity) / 100).toFixed(2))}
              </div>
            </div>
          </div>
        </li>
      )
    })
    return order;
  }


  render() {
    const cartSummaryItem = this.getOrder()
    const { firstName, lastName, email, street, city, usState, zip } = this.state.errorHandler;
    const { subTotal, tax, totalAmount } = this.props.cartSummaryPrice;
    const states = this.states.map((state, id) => <option key={id} value={state}>{state}</option>)
    return (
      <div className={`container-fluid ${this.state.showModal ? 'modal-open' : ''} px-1 px-sm-4 mt-4`}>
        <Link className='backText' to={'/'}><i className="fas fa-long-arrow-alt-left "></i> Back to catalog</Link>
        <h3 className="d-block mt-2">Checkout</h3>
        <hr/>
        <div className="container-fluid">
          <div className="row">
            <h4 className="col-12 col-sm-6 col-lg-7 p-0">Billing Address</h4>
            <h4 className="col-12 col-sm-6 col-lg-5 d-none d-md-block">Order Summary</h4>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-7 p-0">

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="firstName">Name</label>
                  <input type="text" name="firstName" className={'form-control ' + (firstName ? 'border border-danger' : '')} id="firstName" placeholder="First Name" onChange={this.changeHandler} value={this.state.firstName} />
                  {firstName && <small className='text-danger ml-2' >First Name is Required</small>}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" name="lastName" className={'form-control ' + (lastName ? 'border border-danger' : '')} id="lastName" placeholder="Last Name" onChange={this.changeHandler} value={this.state.lastName} />
                  {lastName && <small className='text-danger ml-2' >Last Name is Required</small>}
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" className={'form-control ' + (email ? 'border border-danger' : '')} id="email" placeholder="you@example.com" onChange={this.changeHandler} value={this.state.email} />
                {email && <small className='text-danger ml-2' >Email is Required</small>}
              </div>

              <div className="form-row">
                <div className="form-group mb-3 col-sm-12 col-md-6 col-lg-8">
                  <label htmlFor="creditCard">Credit Card</label>
                  <input type="text" name="card" className='form-control' id="creditCard" onChange={this.changeHandler} value={this.state.card} />
                </div>
                <div className="form-group mb-3 col-6 col-sm-6 col-md-3 col-lg-2 ">
                  <label htmlFor="expiration">Expiration</label>
                  <input type="text" name="expiration" className='form-control' id="expiration-month" placeholder="00/00" onKeyDown={ this.changeHandler}  value={this.state.expiration}/>
                </div>
                <div className="form-group mb-3 col-6 col-sm-6 col-md-3 col-lg-2">
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" name="cvv" className='form-control' id="cvv" placeholder="000" onChange={this.changeHandler} value={this.state.cvv} />
                </div>
              </div>



              <div className="form-group mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" name="street" className={'form-control ' + (street ? 'border border-danger' : '')} id="address" placeholder="STREET ADDRESS, PO BOX" onChange={this.changeHandler} value={this.state.street} />
                {street && <small className='text-danger ml-2' >Address is Required</small>}
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCity">City</label>
                  <input type="text" name="city" className={'form-control ' + (city ? 'border border-danger' : '')} id="inputCity" onChange={this.changeHandler} value={this.state.city} />
                  {city && <small className='text-danger ml-2' >City is Required</small>}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">State</label>
                  <select id="inputState" className={'form-control ' + (usState ? 'border border-danger' : '')} name="state" onChange={this.changeHandler}>
                    <option>Choose...</option>
                    {states}
                  </select>
                  {usState && <small className='text-danger ml-2' >State is Required</small>}
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="inputZip">ZIP</label>
                  <input type="text" name="zip" className={'form-control ' + (zip ? 'border border-danger' : '')} id="inputZip" onChange={this.changeHandler} value={this.state.zip} />
                  {zip && <small className='text-danger ml-2' >ZIP is Required</small>}
                </div>
              </div>
              <hr />
              <div className="container-fluid">
                <div className="row">
                  <h4>Delivery Method</h4>
                </div>
                <div className="container-fluid pl-4">
                  <div className="row d-flex justify-content-between">
                    <Label check>
                      <Input type="radio" name="radio1" defaultChecked />{' '}
                      <span>Shipping</span>
                    </Label>
                    <div className="">
                      <span>$10</span>
                    </div>
                  </div>
                  <div className="row">
                    <small>Standard (5-7 Day Delivery)</small>
                  </div>

                </div>
              </div>
              <div className="container mt-4 mx-0 p-0">
                <h4 className="col-12 col-md-6 col-lg-5 p-0 d-block d-md-none">Order Summary</h4>
                <button type="button" className="mt-1 mb-0-sm btn btn-primary btn-lg d-none d-md-block" onClick={this.placeOrder} >Place Order</button>
              </div>

            </div>

            <div className="col-12 col-md-6 col-lg-5 px-0 pb-3 pt-0 p-md-2">
              <button type="button" className="mt-1 mb-0-sm btn btn-primary btn-lg btn-block mb-2" onClick={this.placeOrder} >Place Order</button>
              <div className="card-footer checkout-footer container-fluid">
                <div className="checkout-subtotal">
                  Subtotal
                    <span className="float-right">${subTotal}</span>
                </div>
                <div className="checkout-shipping">
                  Shipping
                    <span className="float-right">$10</span>
                </div>
                <div className="checkout-tax">
                  Tax
                    <span className="float-right">${tax}</span>
                </div>
                <hr />
                <div className="checkout-total">
                  Total
                    <span className="float-right">${totalAmount}</span>
                </div>
              </div>
              <div className="card checkout-cart-container mt-0">
                <ul className="list-group list-group-flush ">
                  {cartSummaryItem}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        <CreditModal toggle={this.toggleModal} showModal={this.state.showModal} />
      </div>
    );
  }
}

export default withRouter(CheckoutForm);
