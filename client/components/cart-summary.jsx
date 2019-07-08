import React from 'react';
import CartSummaryItem from './cart-summary-item';
import image from '../images/empty.png';
import DeleteItemModal from './delete-item-modal';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      itemToDelete: '',
      shipping: 10
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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

  clickHandler(evt) {
    this.props.goBack('catalog', {});
  }

  addTotal() {
    const { cart } = this.props;
    let total = 0;
    for (var item of cart) {
      total += item.price * item.quantity;
    }
    return (total / 100).toFixed(2);
  }

  productPrice( itemPrice ){
    let price = String(itemPrice)
    if ( price.length > 6 ){
      const firstSlice = price.slice(0 , price.length - 6 );
      const secondSlice = price.slice( price.length - 6 );
      price = firstSlice + ',' + secondSlice;
    }
    return price;
  }

  placeOrder() {
    if (this.props.cart.length) {
      this.props.goBack('checkout', { 
        subTotal: this.productPrice(this.addTotal()),
        tax: this.productPrice((parseInt(this.addTotal()) * .09).toFixed(2)),
        totalAmount: this.productPrice((parseInt(this.addTotal()) + ( parseInt(this.addTotal()) * .09 ) + 10).toFixed(2)) 
      });
    }
  }

  render() {
    return (
      <div className={`${this.state.showModal ? 'modal-open' : ''} px-1 px-sm-4 mt-4`}>
      {/* <div className="row"> */}
        <div className="container-fluid mb-2 p-0">
          <span className='backText' onClick={this.clickHandler}><i className="fas fa-long-arrow-alt-left "></i> Back to catalog</span>
        </div>
        <div className="container-fluid p-0">
          <h3 className="mt-2">Cart</h3>
        </div>

      {/* </div> */}
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
                    <h6>SUMMARY</h6>
                  </div>
                  <div className="cart-summary-detail">
                    <div className="cart-subtotal d-flex justify-content-between px-2">
                      <p>SUBTOTAL</p>
                      <p>${ this.productPrice(this.addTotal()) }</p>
                    </div>
                    <div className="cart-shipping d-flex justify-content-between px-2">
                      <p>ESTIMATED SHIPPING</p>
                      <p>$10.00</p>
                    </div>
                    <div className="cart-tax d-flex justify-content-between px-2">
                      <p>ESTIMATED TAX</p>
                      <p>${ this.productPrice((parseInt(this.addTotal()) * .09).toFixed(2)) }</p>
                    </div>
                    <div className="total d-flex justify-content-between pt-2 px-2">
                      <b><p>TOTAL</p></b>
                      <b><p>${ this.productPrice((parseInt(this.addTotal()) + ( parseInt(this.addTotal()) * .09 ) + 10).toFixed(2)) }</p></b>
                    </div>
                  </div>
                  <button type="button" className="mt-2 mb-0-sm btn btn-light btn-lg btn-block" onClick={this.placeOrder} >Checkout</button>
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

export default CartSummary;
