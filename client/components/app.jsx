import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-detail';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      },
      cart: [],
      updated: false
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  componentDidUpdate(){
    if ( !this.state.updated ){
      this.getProducts();
      this.getCartItems();
    }
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
      .then(cart => this.setState({ cart, updated: true }));
  }

  setView(name, params) {
    console.log( 'params', params )
    this.setState({
      view: {
        name,
        params
      }
    });
  }

  addToCart(product) {
    fetch('/api/cart.php', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ cart: [...this.state.cart, product], updated: false }));
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
      .then(() => this.setState({
        view: {
          name: 'catalog',
          params: {}
        },
        cart: []
      }));
  }


  render() {
    this.state
    let count = null;
    const totalItemCount = this.state.cart.map( item => count += parseInt( item.quantity));
    return (
      <div className="col-12 px-0">
        <Header cartItemCount={ count } setView={ this.setView } />
        <div className="container appContainer p-0">
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
            />
          }
          {(this.state.view.name === 'cart') &&
            <CartSummary
              cart={ this.state.cart }
              goBack={ this.setView }
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

        </div>
      </div>
    );
  }
}
