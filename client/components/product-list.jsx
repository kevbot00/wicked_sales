import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductListItem from './product-list-item';
import Image from '../images/header.jpg';

class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  
    this.clickHandler = this.clickHandler.bind( this );
    this.focusToProductList = React.createRef();
  }

  componentDidMount() {
    this.getProducts();
    this.getCartItems();
  }

  getProducts() {
    fetch('/api/routes/products', {
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

  clickHandler( evt ){
    if ( this.focusToProductList.current){
      this.focusToProductList.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      })
    }
  }

  render(){
    const productArray = this.state.products.map(product => {
      return <ProductListItem key={ product.id } product={ product } addHandler={ this.props.addHandler } />;
    });
    return (
      <div className="p-0">
          <div className="product-list-header-img mb-4"  style={{'backgroundImage': `url(${Image})`}} alt="">
            <div className="container-fluid">
              <div className="product-list-header-title">
                Ride bikes. Have fun. Feel Good.
                <div className="container-fluid">
                  <div className="row d-flex justify-content-center">
                    <button className="product-list-header-button btn btn-lg btn-light mt-3" onClick={ this.clickHandler }>SEE THE BIKES</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="product-list-section row d-flex justify-content-center m-0 pt-2" ref={ this.focusToProductList }>
          {productArray}
        </div>
      </div>
    );
  }
}

export default ProductList;