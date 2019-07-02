import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);

  }

  componentDidMount() {
    fetch(`/api/products.php?id=${this.props.id.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ product: data });
      });
  }

  clickHandler() {
    this.props.goBack('catalog', {});
  }

  addHandler() {
    const { product , quantity } = this.state
    this.props.addHandler(product, quantity);
  }

  updateQuantity( evt , data ) {
    (data === 'minus' && this.state.quantity !== 1) 
      ? this.setState( { quantity: this.state.quantity - 1 }) 
      : data === 'plus' && this.setState( { quantity: this.state.quantity + 1 });
  }

  existInCart(){
    if ( this.state.product ) {
      for ( let item of this.props.cart ){
        console.log( this.state.product.id , item.id )
        if ( item.id == this.state.product.id ) return true
      }
      return false;
    }
  }

  render() {
    return this.state.product ? (
      <div className='detailContainer container-fluid'>
        <div className="goBackSection">
          <span className='backText' onClick={ this.clickHandler } ><i className="fas fa-long-arrow-alt-left "></i> Back to catalog</span>
        </div>
        <div className="mt-2 productDetailContainer border-bottom border-secondary row">
          <div className="col-lg-6 col-md-6 mb-3 d-flex align-items-center justify-content-center productImgContainer">
              <img className="productImg img-fluid d-flex align-items-center" src={ this.state.product.image}/>
          </div>
          <div className="productInfo col-lg-6 col-md-6 mt-2 mb-3">
            <h2 className='mb-4'>{this.state.product.name}</h2>
            <h4 className='productPrice mb-4'>${ (parseInt(this.state.product.price) / 100).toFixed(2)}</h4>
            { this.state.product.shortDescription }
          <div className="row d-flex align-items-center mt-4 pl-3">
            <button className="addBtn ml-1 btn-lg btn-outline-dark d-inline-block mr-2 mr-sm-4" onClick={ this.addHandler } >Add to Cart</button>
            <div className="d-inline-block">
              <div className="d-flex align-items-center ml-1 ml-4-sm pl-4">
                <i id='minus' className="fas fa-minus-circle mr-1" style={{'fontSize': '25px'}} onClick={ evt => this.updateQuantity( evt, 'minus' ) } ></i>
                <span className="text-center" type="text" style={{'width':'40px', 'fontSize': '20px'}}>{this.state.quantity}</span>
                <i id='plus' className="fas fa-plus-circle ml-1" style={{'fontSize': '25px'}} onClick={ evt => this.updateQuantity( evt, 'plus' ) } ></i>
              </div>
            </div>
          </div>
          { this.existInCart() ? <small className="ml-3 mt-1 text-secondary">Already exist in cart</small> : null}
        </div>

        </div>
        <div className="productDescription mt-3 mb-4">
          { this.state.product.longDescription }
        </div>

      </div>
    ) : null;

  }

}

export default ProductDetails;
