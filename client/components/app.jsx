import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-detail';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Confirmation from './confirmation';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'cart',
        params: {}
      },
      cart: [],
      added: ''
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.saveItemQuantity = this.saveItemQuantity.bind( this );
    this.deleteItem = this.deleteItem.bind( this );
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  componentDidUpdate(){
    if ( this.state.added ){
      setTimeout( () => this.setState({added: ''}), 2000);
    }
  }

  setView(name, params) {
    console.log( params );
    this.setState({
      view: {
        name,
        params
      }
    });
  }

  getProducts() {
    fetch('/api/products.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ products: data}));
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

  placeOrder(custInfo) {
    fetch('/api/orders.php', {
      method: 'POST',
      body: JSON.stringify(custInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      // ROUTE BACK TO CONFIRMATION PAGE
      .then( data => {
        console.log( data );
        this.getCartItems();
        this.setView( 
          'confirmation', 
          {
            'cart': custInfo.cart, 
            custInfo, 
            'orderId': data.id
          });
      })
  }

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
      <div className="col-12 px-0">
        <Header cartItemCount={ count } setView={ this.setView } />
        <div className="container appContainer p-2">
        <div className="snackbarContainer">
          <div className={'snackbar ' + this.state.added}>Added to Cart</div>
        </div>
          { (this.state.view.name === 'catalog') &&
            <ProductList
              products={ this.state.products }
              view={ this.setView }
              addHandler={ this.addToCart }
            />
          }
          {(this.state.view.name === 'details') &&
            <ProductDetails
              id={ this.state.view.params }
              goBack={ this.setView }
              addHandler={ this.addToCart }
              cart={ this.state.cart }
            />
          }
          {(this.state.view.name === 'cart') &&
            <CartSummary
              cart={ this.state.cart }
              goBack={ this.setView }
              save={ this.saveItemQuantity }
              delete={ this.deleteItem }
            />
          }
          {(this.state.view.name === 'checkout') &&
            <CheckoutForm
              cart={ this.state.cart }
              goBack={ this.setView }
              placeOrder={ this.placeOrder }
              total={ this.state.view.params.totalAmount }
            />
          }
          {(this.state.view.name === 'confirmation') &&
            <Confirmation 
              order={this.state.view.params } 
              goBack={ this.setView }
            />
          }
        </div>
      </div>
    );
  }
}
