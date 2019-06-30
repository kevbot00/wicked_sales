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
    this.setState({edit: false });
    if ( this.state.quantity === "" ){
      return this.setState( {quantity: this.props.item.quantity, edit: false})
    }
    if ( parseInt(this.state.quantity) ){
      return this.props.save( id, this.state.quantity )
    }
    this.props.delete( id )
  }

  getProductInfo(){
    this.props.getDetail( 'details', this.props.item )
  }


  render() {
    console.log( this.props.item.shortDescription )
    const { item } = this.props;
    return (
      <div className="mt-2 row fakeCard">
        <div className="col-sm-3 col-md-3 px-0">
          <img src={item.image} className="cartImg" />
        </div>
        <div className="col-sm-9 pt-4 pl-0">
          <div className="col-7 d-inline-block align-top h-100 pl-2 pr-0">
            <h5 className="d-inline-block border-bottom align-top mt-1 text-primary border-primary cart-product-redirect" onClick={ this.getProductInfo }>{item.name}</h5>
            <p className="d-inline-block mt-1 float-right">${((item.price) / 100).toFixed(2)}</p>
            <p>{this.props.item.shortDescription}</p>
          </div>
          <div className="col-5 d-inline-block text-right px-0 w-100 h-100">
            <div className='d-inline-block'>
              <p className="text-right d-inline w-50 align-middle">
                Quantity:
                <input type='text' className="ml-2 text-center quantity-input border border-secondary" value={this.state.quantity} onClick={ evt => evt.stopPropagation() } onChange={ this.updateQuantity}/>
              </p>
            </div>
            <div className="d-block mt-2">
              { this.state.edit && <button className="w-25-sm ml-2 mt-1 mt-sm-0 text-center d-block float-right rounded btn btn-outline-secondary" onClick={this.saveHandler }>
                Save
              </button>}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
