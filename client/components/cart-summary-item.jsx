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

  handleBlur( evt ) {
    if ( this.state.quantity === "" ){
      this.setState( {quantity: this.props.item.quantity, edit: false})
    }
    return this.state.edit;
  }


  render() {
    const { item } = this.props;
    return (
      <div className="mt-2 row fakeCard">
        <div className="col-sm-3 col-md-3 px-0">
          <img src={item.image} className="cartImg" />
        </div>
        <div className="col-sm-9 pt-4 pl-1 pl-sm-0 pr-0 pr-1-sm">
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

        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
