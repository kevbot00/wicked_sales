import React from 'react';

class CartSummaryItem extends React.Component {
  constructor( props ){
    super(props);
    this.state = {
      quantity: this.props.item.quantity
    }
    this.updateQuantity = this.updateQuantity.bind( this );
  }

  updateQuantity( evt ){
    const { id } = this.props.item
    const quantity = evt.target.value;
    if ( quantity ){
      fetch(`api/cart.php?id=${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          quantity
        })
      })
      .then( res => res.json() )
      .then( data => this.setState({ quantity: data['quantity'] }))
    }

    
  }
  render(){
    const { item } = this.props;
    return (
      <div className="mt-4 row fakeCard">
        <div className="col-sm-4 col-md-4 px-0">
          <img src={item.image} className="card-img cardImg cartImg"/>
        </div>
        <div className="col-sm-8 pt-4 pl-4">
          <h5 className="d-inline">{item.name}</h5>
          <p className="float-right text-right d-inline w-50">Quantity:<input className="float-right w-25 ml-3 text-center" value={ this.state.quantity } type="number" onChange={ this.updateQuantity }></input></p>
          <p>${((item.price) / 100).toFixed(2)}</p>
          <p>{item.shortDescription}</p>
        </div>
        {/* <button type="button" className="btn btn-danger float-right delete-btn" >Delete</button> */}
      </div>
    );
  }
}

export default CartSummaryItem;
