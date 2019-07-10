import React from 'react';
import ProductCarousel from './product-detail-carousel';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, HashRouter } from "react-router-dom";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
    // this.clickHandler = this.clickHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);

  }

  componentDidMount() {
    fetch(`/api/products.php?id=${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      });
  }

  // clickHandler() {
  //   this.props.goBack('catalog', {});
  // }

  addHandler() {
    const { product, quantity } = this.state
    this.props.addHandler(product, quantity);
  }

  updateQuantity(evt, data) {
    if ( this.state.quantity > 999 ) return;
    (data === 'minus' && this.state.quantity !== 1)
      ? this.setState({ quantity: this.state.quantity - 1 })
      : data === 'plus' && this.setState({ quantity: this.state.quantity + 1 });
  }

  existInCart() {
    if (this.state.product) {
      for (let item of this.props.cart) {
        if (item.id == this.state.product.id) return true
      }
      return false;
    }
  }

  productPrice(){
    let price = String((this.state.product.price / 100).toFixed(2))
    if ( price.length > 6 ){
      const firstSlice = price.slice(0 , price.length - 6 );
      const secondSlice = price.slice( price.length - 6 );
      price = firstSlice + ',' + secondSlice;
    }
    return price;
  }

  render() {
    return this.state.product ? (
      <div className='detailContainer container-fluid px-1 px-sm-4 mt-4 '>
        <Link className="goBackSection" to={'/'}>
          <span className='backText' ><i className="fas fa-long-arrow-alt-left "></i> Back to catalog</span>
        </Link>
        <div className="border-bottom border-secondary">
          <div className="container-fluid pt-2 pt-sm-4">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-7 p-0 text-center d-flex justify-items-stretch product-carousel-section mb-2">
                  <ProductCarousel images={this.state.product.images} />
              </div>
              <div className="col-12 col-sm-12 col-md-5 mb-3">
                <h2 className='mb-2 product-detail-name'>{this.state.product.name}</h2>
                <h4 className='product-price'>${ this.productPrice() }</h4>
                <hr />
                <div className="product-short-description">{this.state.product.shortDescription}</div>
                <div className="mt-3 product-specs">
                  Color / <span className="text-secondary">{this.state.product.specifications.color}</span> | Size / <span className="text-secondary">{this.state.product.specifications.size}</span> 
                </div>
                <div className="container-fluid">
                  <div className="row d-flex align-items-center mt-4">
                    <button className="addBtn btn-lg btn-outline-dark d-inline-block mr-2 mr-sm-4" onClick={this.addHandler} >Add to Cart</button>
                    <div className="d-flex align-items-center ml-4 ml-sm-0">
                      <i id='minus' className="fas fa-minus-circle mr-1" style={{ 'fontSize': '25px' }} onClick={evt => this.updateQuantity(evt, 'minus')} ></i>
                      <span className="text-center" type="text" style={{ 'width': '40px', 'fontSize': '20px' }}>{this.state.quantity}</span>
                      <i id='plus' className="fas fa-plus-circle ml-1" style={{ 'fontSize': '25px' }} onClick={evt => this.updateQuantity(evt, 'plus')} ></i>
                    </div>
                  </div>
                </div>

                {this.existInCart() ? <small className="ml-2 mt-1 text-secondary">Already exist in cart</small> : null}
              </div>
            </div>
          </div>
        </div>


        <div className="container-fluid mt-3 mb-4">
          <h3>Product Details</h3>
          {this.state.product.longDescription}
        </div>

      </div>
    ) : null;

  }

}

export default ProductDetails;
