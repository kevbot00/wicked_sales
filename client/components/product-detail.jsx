import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
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
    this.props.addHandler(this.state.product);
  }

  render() {
    return this.state.product ? (
      <div className='detailContainer container-fluid'>
        <div className="goBackSection">
          <div className='backText mb-4' onClick={ this.clickHandler } ><i className="fas fa-long-arrow-alt-left"></i> Back to catalog</div>
        </div>
        <div className="productDetailContainer row">
          <div className="col-lg-6 col-md-8 mb-3">
            <img className="productImg" src={ this.state.product.image}/>
          </div>
          <div className="productInfo col-lg-6 col-md-4 mt-2 mb-4">
            <h2 className='mb-4'>{this.state.product.name}</h2>
            <h4 className='productPrice mb-4'>${ (this.state.product.price / 100).toFixed(2)}</h4>
            { this.state.product.shortDescription }
            <button className="addBtn btn-lg btn-outline-dark mt-4" onClick={ this.addHandler } >Add to Cart</button>
          </div>

        </div>
        <div className="productDescription mt-4">
          { this.state.product.longDescription }
        </div>

      </div>
    ) : null;

  }

}

export default ProductDetails;
