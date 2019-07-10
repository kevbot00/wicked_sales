import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity,
      edit: false
    }
    this.updateQuantity = this.updateQuantity.bind(this);
    this.saveHandler = this.saveHandler.bind( this );
    this.getProductInfo = this.getProductInfo.bind( this );
    this.handleBlur = this.handleBlur.bind( this );
    this.quantityHandler = this.quantityHandler.bind( this );
    this.deleteHandler = this.deleteHandler.bind( this );


  }

  quantityHandler( evt ){
    if ( evt.target.value === '10' ){
      this.setState({edit: true})
    } else {
      this.setState({quantity: evt.target.value}, () => this.props.save( this.props.item.id, this.state.quantity ));
    }
  }

  updateQuantity(evt) {
    const { id } = this.props.item;
    const numRegex = /^[0-9]*$/g
    let quantity = evt.target.value
    if ( quantity.length > 3 ) return;
    if ( numRegex.test( quantity ) ){
      if ( quantity === ''){
        quantity = '';
      } else {
        quantity = parseInt( quantity );
      }
      this.setState({ quantity: quantity , edit: true })
    } 
  }

  saveHandler( evt ){
    evt.stopPropagation();
    const { id } = this.props.item
    if ( this.state.quantity === "" ){
      this.setState( {quantity: this.props.item.quantity })
    } else if ( parseInt(this.state.quantity) ){
      this.props.save( id, this.state.quantity )
    } else if ( this.state.quantity === 0 ){
      this.setState( {quantity: this.props.item.quantity })
      this.deleteHandler();
    }
    this.setState({edit: false });
  }

  deleteHandler() {
    this.props.toggleModal( this.props.item.id )
  }

  getProductInfo(){
    this.props.getDetail( 'details', this.props.item )
  }

  handleBlur( evt ) {
    if ( this.state.quantity === "" ){
      this.setState( {quantity: this.props.item.quantity, edit: false})
    }
    return this.state.edit;
  }

  productPrice(){
    let price = String((this.props.item.price / 100).toFixed(2))
    if ( price.length > 6 ){
      const firstSlice = price.slice(0 , price.length - 6 );
      const secondSlice = price.slice( price.length - 6 );
      price = firstSlice + ',' + secondSlice;
    }
    return price;
  }


  render() {

    const { item } = this.props;
    return (
      <div className="container-fluid mb-1 pb-3 card">
        <div className="row p-0">
          <div className="col-12 col-sm-3 p-0 d-flex justify-content-center align-items-center cart-img-container">
            <img className="cart-img" src={ item.image } width="100%" height="100%" alt=""/>
          </div>
          <div className="container col-12 col-sm-9 pt-3">
            <div className="cart-item-body row">
              <div className="col-7 cart-item-summary">
                <div className="cart-item-title">
                  <span className=" border-bottom text-primary border-primary cursor cart-summary-item-name" onClick={ this.getProductInfo }>{item.name}</span>
                </div>
                <div className="cart-item-description product-specs">
                  <span className="d-block d-sm-inline">Color / <span className="text-secondary">{ this.props.item.specifications.color }</span></span> 
                  <span className="d-none d-md-inline"> | </span> 
                  <span className="d-block d-sm-inline"> Size / <span className="text-secondary">{this.props.item.specifications.size}</span></span>
                </div>
                <div className="cart-item-quantity d-flex justify-content-start">
                  <div className="">Quantity</div>
                  { this.state.edit || this.state.quantity > 9
                    ? <input 
                        onBlur={ this.handleBlur } 
                        type='text' 
                        className="ml-2 text-center quantity-input border border-secondary" 
                        value={this.state.quantity} 
                        onClick={ evt => evt.stopPropagation() } 
                        onChange={ this.updateQuantity}
                      />
                    : <div className="cart-select-quantity">
                        <select className="cart-item-quantity-dropdown text-center pl-3" name="quantity" id="quantity" value={ this.state.quantity} onChange={ this.quantityHandler }>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                      
                          <option className="border-top" value="10">10+</option>
                        </select>
                      </div>
                  }
                </div>
                <span className="border-bottom border-secondary mr-2 cursor" onClick={ this.deleteHandler }>Remove</span>
                { this.state.edit && <span className="border-bottom border-secondary ml-1 cursor" onClick={ this.saveHandler }>Save</span> }
              </div>
              <div className="col-5 cart-item-price p-0 text-right pr-2 h-50">
                <span>${ this.productPrice() }</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default CartSummaryItem;
