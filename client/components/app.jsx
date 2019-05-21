import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-detail';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  getProducts() {
    fetch('/api/products.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
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

  setView(name, params) {
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
      .then(data => this.setState({ cart: [...this.state.cart, product] }));

  }

  render() {
    return (
      <div>
        <Header cartItemCount={ this.state.cart } />
        <div className="container-fluid">
          { this.state.view.name !== 'details'
            ? <ProductList products={ this.state.products } view={ this.setView } addHandler={ this.addToCart } />
            : <ProductDetails id={ this.state.view.params } goBack={ this.setView } addHandler={ this.addToCart } />}
        </div>
      </div>
    );
  }
}
