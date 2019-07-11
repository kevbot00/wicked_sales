import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, HashRouter } from "react-router-dom";
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-detail';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Confirmation from './confirmation';
import { addTotal, formatPrice, addTax, addTotalAmount, getPrices } from './product-price';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      cartSummaryPrice: {},
      added: '',
      updated: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.updateItemQuantity = this.updateItemQuantity.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
  }

  componentDidMount() {
    this.getCartItems();
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
  
  // Fetch Calls
  getCartItems() {
    fetch('/api/cart.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(cart => {
        const cartSummaryPrice = getPrices( cart );
        this.setState({ cart, cartSummaryPrice }, () => console.log( this.state.cartSummaryPrice))
      });
  }

  addToCart(product , quantity ) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify({ product, quantity }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        
        this.setState({ cart: [...this.state.cart, product], added: 'show' } , this.getCartItems )}
      )
  }

  updateItemQuantity( productId, quantity ){
    let cart = this.state.cart.map( item => {
      if ( item.id === productId ){
        item.quantity = quantity;
      }
      return item;
    })
    fetch(`api/cart.php?id=${productId}`, {
      method: "PATCH",
      body: JSON.stringify({
        quantity
      })
    })
    .then( res => res.json() )
    .then( data => this.setState({ cart }))
  }

  deleteItem( productId ){
    let cart = this.state.cart.filter( item => {
      if ( item.id !== productId ) return item
    })
    fetch(`api/cart.php?id=${productId}`, {
      method: "DELETE",
      })
    .then( res => res.json() )
    .then( data => this.setState({ cart }, this.getProducts ));
  }

  placeOrder(custInfo , orderDetail ) {
    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify(custInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then( data => {
        this.getCartItems();
        this.setState({ 'cart': custInfo.cart, custInfo, 'orderId': data.id, orderDetail });
      })
  }

  addTotal( cart ) {
    let total = 0;
    for (var item of cart) {
      total += item.price * item.quantity;
    }
    return (total / 100).toFixed(2);
  }
  
  
  productPrice( itemPrice ){
    let price = String(itemPrice)
    let firstSlice;
    let secondSlice;
    if ( price.length > 9 ) {
      firstSlice = price.slice(0, price.length - 9 );
      secondSlice = price.slice( price.length - 9 );
      price = firstSlice + ',' + secondSlice;
    } 
    if ( price.length > 6 ){
      firstSlice = price.slice(0 , price.length - 6 );
      secondSlice = price.slice( price.length - 6 );
      price = firstSlice + ',' + secondSlice;
    }
    return price;
  }
  
  render() {
    let count = null;
    const totalItemCount = this.state.cart.map( item => count += parseInt( item.quantity));
    return (
      <HashRouter>
        <div className="col-12 px-0">
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
                render={ props => <CheckoutForm {...props} cart={ this.state.cart } placeOrder={ this.placeOrder } getCartItem={this.getCartItems} /> }
              />
              <Route
                path="/confirmation"
                render={ props => <Confirmation {...props} /> }
                />

                }}
            </Switch>
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default App;
