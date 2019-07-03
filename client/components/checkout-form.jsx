import React from 'react';
import CreditModal from './credit-card-modal';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      card: '7273 8269 3277 6949',
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
    this.clickHandler = this.clickHandler.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    
  }

  componentDidMount(){
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
    if (target.name === "street") return this.setState({ street: target.value });
    if (target.name === "city") return this.setState({ city: target.value});
    if (target.name === "state") return this.setState({ usState: target.value });
    if (target.name === "zip") return this.setState({ zip: target.value} );
  }

  clickHandler() {
    this.props.goBack('catalog', {});
  }

  checkInputValidity() {
    const { firstName, lastName, email, street, city, usState, zip } = this.state;
    if (firstName && lastName && email && street && city && usState && zip ) return true;
    return false;

  }

  placeOrder() {
    const { firstName, lastName, email, card, street, city, usState, zip } = this.state;
    if ( this.checkInputValidity() ) {
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
        firstName: !Boolean( firstName),
        lastName: !Boolean( lastName),
        email: !Boolean( email),
        street: !Boolean( street),
        city: !Boolean( city),
        usState: !Boolean( usState),
        zip: !Boolean( zip),
      }
    })
    console.error( 'Something went wrong with the input field')
  }

  render() {
    const { firstName, lastName, email, street, city, usState, zip } = this.state.errorHandler;
    const cart = this.props.cart.map( ( item, id ) => {
      return <li className="list-group-item checkout-list-item px-3" key={id}>
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
        <span className='backText' onClick={this.clickHandler}><i className="fas fa-long-arrow-alt-left "></i> Back to catalog</span>
        <h3 className="d-block mt-2">Checkout</h3>
        <div className="row">
          <h4 className="col-lg-8">Billing Address</h4>
          <h4 className="col-lg-4">Your cart</h4>
          {/* Add badge */}
        </div>
        <div className="row">
          <div className="col-lg-8">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" className={ 'form-control ' + ( firstName ? 'border border-danger' : '')} id="firstName" placeholder="First Name" onChange={ this.changeHandler } value={this.state.firstName}/>
                { firstName && <small className='text-danger ml-2' >First Name is Required</small>}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" className={ 'form-control ' + ( lastName ? 'border border-danger' : '')} id="lastName" placeholder="Last Name" onChange={ this.changeHandler } value={this.state.lastName}/>
                { lastName && <small className='text-danger ml-2' >Last Name is Required</small>}
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" className={ 'form-control ' + ( email ? 'border border-danger' : '')} id="email" placeholder="you@example.com" onChange={ this.changeHandler } value={this.state.email}/>
              { email && <small className='text-danger ml-2' >Email is Required</small>}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="creditCard">Credit Card</label>
              <input type="text" name="card" className='form-control' id="creditCard" onChange={ this.changeHandler } value={this.state.card}/>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address">Address</label>
              <input type="text" name="street" className={ 'form-control ' + ( street ? 'border border-danger' : '')} id="address" placeholder="1234 Main Street" onChange={ this.changeHandler } value={this.state.street}/>
              { street && <small className='text-danger ml-2' >Address is Required</small>}
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" name="city" className={ 'form-control ' + ( city ? 'border border-danger' : '')} id="inputCity" onChange={ this.changeHandler } value={this.state.city}/>
                { city && <small className='text-danger ml-2' >City is Required</small>}
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select id="inputState"  className={ 'form-control ' + ( usState ? 'border border-danger' : '')} name="state" onChange={ this.changeHandler }>
                  <option>Choose...</option>
                  {states}
                </select>
                { usState && <small className='text-danger ml-2' >State is Required</small>}
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">ZIP</label>
                <input type="text" name="zip" className={ 'form-control ' + ( zip ? 'border border-danger' : '')} id="inputZip" onChange={ this.changeHandler } value={this.state.zip}/>
                { zip && <small className='text-danger ml-2' >ZIP is Required</small>}
              </div>
            </div>
          </div>
          {/* Cart */}
          <div className="col-lg-4 p-3 p-sm-2">
            <div className="card checkoutCartContainer mt-3">
              <ul className="list-group list-group-flush ">
                { cart }
              </ul>
            </div>
            <div className="card-footer checkout-footer">Total (USD) <span className="float-right text-dark">${ this.props.total }</span></div>
            <button type="button" className="mt-4 mb-4 mb-0-sm btn btn-primary btn-lg btn-block" onClick={ this.placeOrder } >Checkout</button>
          </div>
        </div>
        {/* Modal */}
        <CreditModal toggle={ this.toggleModal } showModal={this.state.showModal} />
      </div>
    );
  }
}

export default CheckoutForm;
