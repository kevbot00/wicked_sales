import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, HashRouter } from "react-router-dom";
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-detail';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Confirmation from './confirmation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cart: [],
      added: ''
    };
    this.addToCart = this.addToCart.bind(this);
    this.saveItemQuantity = this.saveItemQuantity.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
  }

  componentDidMount() {
    this.getCartItems();
  }

  componentDidUpdate( prevProps, prevState ){
    console.log( prevProps, prevState );
    if ( this.state.added ){
      setTimeout( () => this.setState({added: ''}), 2000);
    }
  }

  getCartItems() {
    fetch('/api/cart.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(cart => this.setState({ cart }));
  }

  saveItemQuantity( productId, quantity ){
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

  addToCart(product , quantity ) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify({ product, quantity }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ cart: [...this.state.cart, product], added: 'show' } , this.getCartItems ))
  }

  // placeOrder(custInfo , orderDetail ) {
  //   fetch('/api/orders.php', {
  //     method: 'POST',
  //     body: JSON.stringify(custInfo),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => res.json())
  //     // ROUTE BACK TO CONFIRMATION PAGE
  //     .then( data => {
  //       this.getCartItems();
  //       this.setView( 
  //         'confirmation', 
  //         {
  //           'cart': custInfo.cart, 
  //           custInfo, 
  //           'orderId': data.id,
  //           orderDetail
  //         });
  //     })
  // }

  snackbar() {
    setTimeout( () => {
      return 'snackbar show'
    })
    return 'snackbar show'
  }


  render() {
    let count = null;
    const totalItemCount = this.state.cart.map( item => count += parseInt( item.quantity));
    return (
      // <div className="col-12 px-0">
      //   <Header cartItemCount={ count } setView={ this.setView } />
      //   <div className="container-fluid appContainer px-0">
      //   <div className="snackbarContainer">
      //     <div className={'snackbar ' + this.state.added}>Added to Cart</div>
      //   </div>
// /*  Router Testing */
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
          render={ props => <CartSummary {...props} cart={this.state.cart} save={ this.saveItemQuantity } delete={ this.deleteItem }/>}
        />
        <Route
          path="/checkout"
          render={ props => <CheckoutForm {...props} cart={ this.state.cart } placeOrder={ this.placeOrder } total={ this.state.view.params }/>}
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



      //     /* { (this.state.view.name === 'catalog') &&
      //       <ProductList
      //         products={ this.state.products }
      //         view={ this.setView }
      //         addHandler={ this.addToCart }
      //       />
      //     }
      //     {(this.state.view.name === 'details') &&
      //       <ProductDetails
      //         id={ this.state.view.params }
      //         goBack={ this.setView }
      //         addHandler={ this.addToCart }
      //         cart={ this.state.cart }
      //       />
      //     }
      //     {(this.state.view.name === 'cart') &&
      //       <CartSummary
      //         cart={ this.state.cart }
      //         goBack={ this.setView }
      //         save={ this.saveItemQuantity }
      //         delete={ this.deleteItem }
      //       />
      //     }
      //     {(this.state.view.name === 'checkout') &&
      //       <CheckoutForm
      //         cart={ this.state.cart }
      //         goBack={ this.setView }
      //         placeOrder={ this.placeOrder }
      //         total={ this.state.view.params }
      //       />
      //     }
      //     {(this.state.view.name === 'confirmation') &&
      //       <Confirmation 
      //         order={this.state.view.params } 
      //         goBack={ this.setView }
      //       />
      //     } */
      //   /* </div>
      // </div> */
    )
  }
}

export default App;
