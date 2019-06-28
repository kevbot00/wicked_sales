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
  }

  updateQuantity(evt) {
    const { id } = this.props.item;
    // const numRegex = /\b^\d+$/g;
    const quantity = evt.target.value;
    // console.log( numRegex.test( quantity ));
    // console.log( quantity );
    // if ( numRegex.test( quantity )){
      // console.log( 'passed');
      this.setState({ quantity, edit: true })
    // }
  }

  saveHandler(){
    const { id } = this.props.item
    this.setState({edit: false });
    if ( this.state.quantity.trim() === "" ){
      return this.setState( {quantity: this.props.item.quantity, edit: false})
    }
    if ( parseInt(this.state.quantity) ){
      return this.props.save( id, this.state.quantity )
    }
    this.props.delete( id )
  }


  render() {
    const { item } = this.props;
    return (
      <div className="mt-2 row fakeCard">
        <div className="col-sm-3 col-md-3 px-0">
          <img src={item.image} className="cartImg" />
        </div>
        <div className="col-sm-9 pt-4 pl-4">
          <div className="col-5 d-inline-block align-top h-100">
            <h5 className="d-inline">{item.name}</h5>
            <p className="pt-2">${((item.price) / 100).toFixed(2)}</p>
          </div>
          <div className="col-7 d-inline-block text-right px-0 w-100">
            <div className='d-inline-block'>
              <p className="text-right d-inline w-50 align-middle">
                Quantity:
                <input type='text' className="ml-2 text-center quantity-input" value={this.state.quantity} onChange={ this.updateQuantity}/>
              </p>
            </div>
              { this.state.edit && <button className="w-25-sm ml-2 text-center float-right rounded btn btn-outline-secondary" onClick={this.saveHandler }>
                Save
              </button>}
          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
