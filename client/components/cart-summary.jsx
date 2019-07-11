import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, HashRouter } from "react-router-dom";
import CartSummaryItem from './cart-summary-item';
import image from '../images/empty.png';
import DeleteItemModal from './delete-item-modal';
// import productPrice from './product-price';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      itemToDelete: '',
      shipping: 10
    }
    this.checkout = this.checkout.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal( id ) { 
    this.setState({
    showModal: !this.state.showModal,
    itemToDelete: id
    })
  }

  viewCart() {
    const shoppingCart = this.props.cart.map(item => 
      <CartSummaryItem 
        key={item.id} 
        item={item} 
        toggleModal={ this.toggleModal } 
        save={this.props.save} 
        delete={this.props.delete} 
        getDetail={this.props.goBack} 
      />);
    return shoppingCart;
  }

  checkout() {
    if (this.props.cart.length) {
      this.props.history.push( '/checkout')
    }
  }

  render() {
    const { totalBeforeTax, tax, totalAmount } = this.props.cartSummaryPrice;
    return (
      <div className={`${this.state.showModal ? 'modal-open' : ''} px-1 px-sm-4 mt-4`}>
        <Link className="container-fluid mb-2 p-0" to={'/'}>
          <span className='backText' onClick={this.clickHandler}><i className="fas fa-long-arrow-alt-left "></i> Back to catalog</span>
        </Link>
        <div className="container-fluid p-0">
          <h3 className="mt-2">Cart</h3>
          <hr/>
        </div>
        <div className="container-fluid">
          { this.props.cart.length ? 
          <div className="row">
            <div className="col-12 col-sm-7 col-md-8  p-0">
              {this.viewCart()}
            </div>
            { this.props.cart.length &&
              <div className="col-12 col-sm-5 col-md-4 p-0 mt-2 mt-sm-0">
                <div className="cart-summary-body ml-0 ml-sm-2 p-3">
                  <div className="cart-summary-header mb-3">
                    <h6>Summary</h6>
                  </div>
                  <div className="cart-summary-detail">
                    <div className="cart-subtotal d-flex justify-content-between px-2">
                      <p>Subtotal</p>
                      <p>${ totalBeforeTax }</p>
                    </div>
                    <div className="cart-shipping d-flex justify-content-between px-2">
                      <p>Estimated Shipping</p>
                      <p>$10.00</p>
                    </div>
                    <div className="cart-tax d-flex justify-content-between px-2">
                      <p>Estimated Tax</p>
                      <p>${ tax}</p>
                    </div>
                    <div className="total d-flex justify-content-between pt-2 px-2">
                      <b><p>Total</p></b>
                      <b><p>${ totalAmount }</p></b>
                    </div>
                  </div>
                  <button type="button" className="mt-2 mb-0-sm btn btn-light btn-lg btn-block" onClick={this.checkout} >Checkout</button>
                </div>
              </div>
            }
          </div>
          : <div className="text-center">
              <img className="h-50 w-50 mb-4" style={{ 'WebkitUserSelect': 'none' }} src={image} />
              <h5 className="mt-4">No Items Found!</h5>
              <i>Sorry, mate, no items found inside your cart</i>
            </div>
          }
        </div>
        {/* MODAL */}
        <DeleteItemModal toggle={ this.toggleModal } id={this.state.itemToDelete } delete={this.props.delete} showModal={this.state.showModal} />
      </div>
    );
  }
}

export default withRouter(CartSummary);
