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
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  setView(name, params) {
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
      .then(data => this.setState({ products: data }));
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          { this.state.view.name !== 'details'
            ? <ProductList products={ this.state.products } view={ this.setView } />
            : <ProductDetails id={ this.state.view.params } goBack={ this.setView } />}
        </div>
      </div>
    );
  }
}
