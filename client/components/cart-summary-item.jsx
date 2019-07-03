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


  render() {
    console.log( this.props.item)
    const { item } = this.props;
    return (
      <div className="container mb-1 pb-3 card">
        <div className="row p-0">
          <div className="col-12 col-sm-3 p-0 d-flex justify-content-center align-items-center cart-img-container">
            <img className="cart-img" src="https://bit.ly/2J7n8KT" width="100%" height="100%" alt=""/>
          </div>
          <div className="container col-12 col-sm-9 pt-3">
            <div className="cart-item-body row">
              <div className="col-7 cart-item-summary">
                <div className="cart-item-title">
                  <span className=" border-bottom text-primary border-primary" onClick={ this.getProductInfo }>{item.name}</span>

                </div>
                <div className="cart-item-description product-specs">
                  Color / <span className="text-secondary">Rage Red</span> | Size / <span className="text-secondary">MD</span> 
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
                <span className="border-bottom border-secondary mr-2" onClick={ this.deleteHandler }>Remove</span>
                { this.state.edit && <span className="border-bottom border-secondary ml-1" onClick={ this.saveHandler }>Update</span> }
              </div>
              <div className="col-5 cart-item-price p-0 text-right pr-2">
                <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div className="mt-2 row fakeCard">
      //   <div className="col-sm-3 col-md-3 px-0">
      //     <img src={item.image} className="cartImg" />
      //   </div>
      //   <div className="col-9">
      //     <div className="col-12 d-flex justify-content-between align-items-end">
      //       <h5 className="d-inline-block border-bottom text-primary border-primary cart-product-redirect" onClick={ this.getProductInfo }>{item.name}</h5>
      //       <p className="align-self-end">${((item.price) / 100).toFixed(2)}</p>
      //     </div>
      //     <div className="col-12">
      //       <p className="d-inline-block mr-1">Quantity</p>
      //       <select name="" id="">
      //         <option value="1">1</option>
      //         <option value="2">2</option>
      //         <option value="3">3</option>
      //         <option value="4">4</option>
      //         <option value="5">5</option>
      //         <option value="6">6</option>
      //         <option value="7">7</option>
      //         <option value="8">8</option>
      //         <option value="9">9</option>
      //         <option className="border-top" value="10+">10+</option>
      //       </select>
      //     </div>
      //     <div className="col-12">
      //       <p className="text-secondary border-bottom d-inline-block">Remove</p>
      //     </div>
      //   </div>
        /* <div className="col-sm-9 pt-4 pl-1 pl-sm-0 pr-0 pr-1-sm">
          <div className="col-12 p-0">
            <div className="col-7 col-sm-8 col-md-9  p-0 pl-0 pl-sm-3 pl-md-0 d-inline-block">
              <h5 className="d-inline-block border-bottom align-top ml-1 ml-0-sm mt-1 text-primary border-primary cart-product-redirect" onClick={ this.getProductInfo }>{item.name}</h5>
              <p className="d-inline-block mt-1 ml-2 ml-sm-3">${((item.price) / 100).toFixed(2)}</p>
            </div>
            <div className="col-5 col-sm-4 col-md-3 d-inline-block text-right px-0">
              <p className="text-right d-inline w-25 align-middle pr-2">
                QTY:
                <input onBlur={ this.handleBlur } type='text' className="ml-2 text-center quantity-input border border-secondary" value={this.state.quantity} onClick={ evt => evt.stopPropagation() } onChange={ this.updateQuantity}/>
              </p>
            </div>
            
              <div className="col-12 h-50 p-0">
                { this.state.edit && <button className="w-25-sm ml-2 mt-1 mr-2 mt-sm-0 text-center d-block float-right rounded btn btn-outline-secondary" onClick={this.saveHandler }>
                  Save
                </button>}
              </div>
            <div className="col-9 h-50 pr-0 pl-1">
              <p className="ml-1 ml-sm-3 ml-md-0">{this.props.item.shortDescription}</p>
            </div>
          </div>

        </div> */
      // </div>
    );
  }
}

export default CartSummaryItem;
