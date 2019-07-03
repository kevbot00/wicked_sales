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
    // parseInt(this.addTotal()) + ( parseInt(this.addTotal()) * .09 ) + this.state.shipping
    return (total / 100).toFixed(2);
  }

  placeOrder() {
    if (this.props.cart.length) {
      this.props.goBack('checkout', { totalAmount: this.addTotal() });
    }
  }

  render() {
    return (
      <div className={`${this.state.showModal ? 'modal-open' : ''}`}>
        <span className='backText pl-3' onClick={this.clickHandler}><i className="fas fa-long-arrow-alt-left "></i> Back to catalog</span>
        <h3 className="mt-2 pl-3">Cart</h3>
        <div className="container-fluid p-0 p-sm-3">
          { this.props.cart.length ? 
          <div className="row">
            <div className="col-12 col-sm-8 col-md-9">
              {this.viewCart()}
            </div>
            { this.props.cart.length &&
              <div className="col-12 col-sm-4 col-md-3 p-3 p-sm-0">
                <div className="cart-summary-body p-3">
                  <div className="cart-summary-header">
                    <h6>SUMMARY</h6>
                  </div>
                  <div className="cart-summary-detail">
                    <div className="cart-subtotal d-flex justify-content-between px-2">
                      <p>Subtotal</p>
                      <p>${ this.addTotal() }</p>
                    </div>
                    <div className="cart-shipping d-flex justify-content-between px-2">
                      <p>Shipping</p>
                      <p>$10.00</p>
                    </div>
                    <div className="cart-tax d-flex justify-content-between px-2">
                      <p>Estimated Tax</p>
                      <p>${( parseInt(this.addTotal()) * .09).toFixed(2)}</p>
                    </div>
                    <div className="total d-flex justify-content-between pt-2 px-2">
                      <b><p>TOTAL</p></b>
                      <b><p>${ (parseInt(this.addTotal()) + ( parseInt(this.addTotal()) * .09 ) + 10).toFixed(2) }</p></b>
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
