import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, HashRouter } from "react-router-dom";
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-detail';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Confirmation from './confirmation';
import { addTotal, formatPrice, addTax, addTotalAmount, getPrices } from './product-price';
import DemoModal from './demo-modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      cartSummaryPrice: {},
      custOrder: null,
      added: '',
      updated: false,
      showModal: false,
    };
    this.addToCart = this.addToCart.bind(this);
    this.updateItemQuantity = this.updateItemQuantity.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
    this.placeOrder = this.placeOrder.bind( this );
    this.toggleModal = this.toggleModal.bind(this);

  }

  componentDidMount() {
    this.getCartItems();
    if ( !sessionStorage.getItem( 'id' ) ){
      this.toggleModal();
      sessionStorage.setItem( 'id' , Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) )
    }
  }

  componentDidUpdate( prevProps, prevState ){
    if ( this.state.added ){
      setTimeout( () => this.setState({added: ''}), 2000);
    }
  }
  // Snackbar
  snackbar() {
    setTimeout( () => {
      return 'snackbar show'
    })
    return 'snackbar show'
  }

  toggleModal() {
    this.setState({
      showModal: !this.state.showModal
    })
  }
  
  // Fetch Calls
  getCartItems() {
    fetch('/api/routes/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(cart => {
        const cartSummaryPrice = getPrices( cart );
        this.setState({ cart, cartSummaryPrice })
      });
  }

  addToCart(product , quantity ) {
    fetch('/api/routes/cart', {
      method: 'POST',
      body: JSON.stringify({ product, quantity }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ 
          cart: [...this.state.cart, product], 
          added: 'show'
        } , this.getCartItems )}
      )
  }

  updateItemQuantity( productId, quantity ){
    let cart = this.state.cart.map( item => {
      if ( item.id === productId ){
        item.quantity = quantity;
      }
      return item;
    });
    fetch(`api/routes/cart?id=${productId}`, {
      method: "PUT",
      body: JSON.stringify({quantity}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json() )
    .then( data => {
      console.log( cart );
      const cartSummaryPrice = getPrices( cart );
      this.setState({ cart, cartSummaryPrice })
    })
  }

  deleteItem( productId ){
    let cart = this.state.cart.filter( item => {
      if ( item.id !== productId ) return item
    })
    fetch(`api/routes/cart?id=${productId}`, {
      method: "DELETE",
      })
    .then( res => res.json() )
    .then( data => {
      this.setState({ cart }, this.getCartItems )
    });
  }

  placeOrder( custInfo ) {
    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify(custInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then( data => {
        this.setState({
          'custOrder': {
            'orderId': data.id,
            custInfo,
            'cartSummaryPrice': this.state.cartSummaryPrice
          }
        })
        this.props.history.push({
          pathname: "/confirmation/" + data.id, 
          state: {'custOrder': this.state.custOrder }
        })
        this.getCartItems();
      })
  }
  
  render() {
    let count = null;
    const totalItemCount = this.state.cart.map( item => count += parseInt( item.quantity));
    return (

        <div className={`col-12 px-0 ${this.state.showModal ? 'modal-open' : ''}`}>
          <Header cartItemCount={ count } />
          <div className="container-fluid appContainer px-0">
            <div className="snackbarContainer">
              <div className={'snackbar ' + this.state.added}>Added to Cart</div>
            </div>
            <Switch>
              <Route 
                exact
                path="/"
                render={ props => <ProductList addHandler={ this.addToCart }/>}
              />
              <Route
                path="/product/:id"
                render={ props => <ProductDetails {...props} addHandler={this.addToCart} cart={ this.state.cart } />}
              />
              <Route
                path="/cart/"
                render={ props => <CartSummary {...props} cart={this.state.cart} cartSummaryPrice={this.state.cartSummaryPrice} save={ this.updateItemQuantity } delete={ this.deleteItem } />}
              />
              <Route
                path="/checkout"
                render={ props => <CheckoutForm {...props} cart={ this.state.cart } cartSummaryPrice={this.state.cartSummaryPrice} getOrderItems={ this.getOrderItems } placeOrder={ this.placeOrder } getCartItem={this.getCartItems} /> }
              />
              <Route
                path="/confirmation/:id"
                render={ props => <Confirmation {...props} custOrder={ this.state.custOrder } /> }
              />
            </Switch>
          </div>
          <DemoModal toggle={this.toggleModal} showModal={this.state.showModal} />
        </div>

    )
  }
}

export default withRouter(App);
