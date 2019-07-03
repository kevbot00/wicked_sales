import React from 'react';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  getOrder() {
    const order = this.props.order.cart.map(item => {
      return (
        <li key={ item.id } className="list-group-item pl-0 py-0 d-flex align-items-center border-bottom" style={{ 'minHeight': '70px'}}>
          <img src={item.image} className="d-none d-sm-block order-summary-img" alt="" />
          <div className="container">
            <div className="row d-flex align-items-center">
              <span className="p-2">{item.name}</span>
              <span className="text-primary"> x {item.quantity} </span>
              <span className="text-muted ml-auto p-1">
                ${ (item.price * item.quantity / 100 ).toFixed(2) }
              </span>
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
    const { custInfo, orderId } = this.props.order;
    return (
      <div className='container-fluid h-100'>
        <div className="row d-flex h-100 pb-4-sm">
          <div className="col-lg-7 p-0 m-0">
            <div className="col-lg-12 row d-flex justify-content-center h-50 p-0 m-0">
              <div className="row w-100 d-flex justify-content-center h-50 mb-2">
                <i className="far fa-check-circle text-primary" style={{ 'fontSize': '110px' }}></i>
              </div>
              <div className="row w-100 d-flex justify-content-center text-center h-50 mt-2">
                Thank you for your purchase!<br /><br />
                Order #{orderId.toUpperCase()}
              </div>
            </div>
            <div className="col-lg-12 row d-flex justify-content-center p-0 mx-3 mb-3">
              <h6 className="col-lg-12 row m-0 mb-sm p-0">Customer Information</h6>
              <div className="col-6">
                Shipping Address<br />
                <i>{custInfo.name}</i><br />
                <i>{custInfo.street}</i><br />
                <i>{custInfo.city}, {custInfo.usState}, {custInfo.zip}</i><br/>
              </div>
              <div className="col-6">
                Billing Address<br />
                <i>{custInfo.name}</i><br />
                <i>{custInfo.street}</i><br />
                <i>{custInfo.city}, {custInfo.usState}, {custInfo.zip}</i><br/>
              </div>
            </div>
            <div className="row w-100 d-flex justify-content-center m-0 mt-4">
              <button className='btn btn-primary' onClick={ this.props.goBack.bind( this, 'catalog' )} >Continue Shopping</button>
            </div>
          </div>
          <div className="col-lg-5">
            <h4 className="col-lg-6 mt-4 mb-2 mt-md-0">Order Summary</h4>
            <div className="card checkoutCartContainer mt-2 h-75" style={{ 'height': '70vh' }}>
              <ul className="list-group list-group-flush ">
                {this.getOrder()}
              </ul>
            </div>
            <div className="card-footer checkout-footer mb-4">Total (USD) <span className="float-right text-dark">${this.addTotal()}</span></div>
          </div>
        </div>
      </div>
    )
  }
}


export default Confirmation;