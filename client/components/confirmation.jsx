import React from 'react';
// import productPrice from './product-price';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, HashRouter } from "react-router-dom";

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  getOrder() {
    const order = this.props.location.state.cart.map(( item, index ) => {
      return (
        <li key={index} className="list-group-item pl-0 py-0 pr-0 pr-sm-2 border-bottom d-flex align-items-stretch" style={{ 'minHeight': '80px' }}>
          <img src={ item.image } className="d-sm-block order-summary-img mr-3" alt="" />
          <div className="container-fluid checkout-cart ">
            <div className="row pl-1">
              <div className="checkout-cart-item-name pt-2">{ item.name }</div>
            </div>
            <div className="row pl-1 ">
              <div className="checkout-cart-item-specs text-secondary">
                <span className="d-sm-block d-md-inline">Color / { item.specifications.color }</span>
                <span className='d-none d-sm-none d-md-inline px-2'>|</span>
                <span className="d-sm-block d-md-inline">Size / { item.specifications.size }</span>
              </div>
            </div>
            <div className="row pl-1">
              <div className="checkout-cart-item-quantity text-secondary"> Qty: { item.quantity } @ ${ productPrice(item.price / 100) }</div>
            </div>
            <div className="row pl-1">
              <div className="checkout-cart-item-price text-secondary">
                ${ productPrice( ((item.price * item.quantity)/100 ).toFixed(2) )}
              </div>
            </div>
          </div>
        </li>
      )
    })
    return order;
  }

  addTotal() {
    const { cart } = this.props.order;
    let total = 0;
    for (let item of cart) {
      total += parseInt(item.price) * item.quantity;
    }
    return (total / 100).toFixed(2);
  }

  render() {
    const { custInfo, orderId } = this.props.location.state;
    const { subTotal, tax, totalAmount } = this.props.location.state.orderDetail;
    return (
      <div className='container-fluid h-100 px-4 mt-4'>
        <div className="row d-flex h-100 pb-4-sm">
          <div className="col-lg-7 p-0 m-0">
            <div className="col-lg-12 row d-flex justify-content-center p-0 m-0">
              <div className="row w-100 d-flex justify-content-center h-50 mb-2">
                <i className="far fa-check-circle text-primary" style={{ 'fontSize': '110px' }}></i>
              </div>
              <div className="row w-100 d-flex justify-content-center text-center h-50 mt-2 mb-4">
                Thank you for your purchase!<br /><br />
                Order #{orderId.toUpperCase()}
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <h6 className="col-lg-12 m-2 p-0">Customer Information</h6>
              </div>
              <div className="row">
                <div className="col-6">
                  Shipping Address<br />
                  <i>{custInfo.name}</i><br />
                  <i>{custInfo.street}</i><br />
                  <i>{custInfo.city}, {custInfo.usState}, {custInfo.zip}</i><br />
                </div>
                <div className="col-6">
                  Billing Address<br />
                  <i>{custInfo.name}</i><br />
                  <i>{custInfo.street}</i><br />
                  <i>{custInfo.city}, {custInfo.usState}, {custInfo.zip}</i><br />
                </div>
              </div>
            </div>
            <div className="row w-100 d-flex justify-content-center m-0 mt-4">
              <Link className='btn btn-primary' to={"/"} >Continue Shopping</Link>
            </div>
          </div>
          <div className="col-lg-5 p-0">
            <h4 className="mt-4 mb-2 mt-md-0">Order Summary</h4>
            <div className="card-footer checkout-footer container-fluid">
              <div className="checkout-subtotal">
                Subtotal
                  <span className="float-right">${subTotal}</span>
              </div>
              <div className="checkout-shipping">
                Shipping
                  <span className="float-right">$10</span>
              </div>
              <div className="checkout-tax">
                Tax
                  <span className="float-right">${tax}</span>
              </div>
              <hr />
              <div className="checkout-total">
                Total
                  <span className="float-right">${totalAmount}</span>
              </div>
            </div>
            <div className="card checkout-cart-container mt-0">
              <ul className="list-group list-group-flush ">
                { this.getOrder() }
              </ul>
            </div>
          </div>

        </div>
      </div>

    )
  }
}


export default Confirmation;