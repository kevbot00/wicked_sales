import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);

  }

  clickHandler() {
    this.props.detail('details', { id: this.props.product.id });
  }

  addHandler(event) {
    event.stopPropagation();
    this.props.addHandler(this.props.product);
  }

  render() {
    console.log( this.props.product.specifications );
    return (
      <div className='col-md-3 col-sm-6 col-12 card-group' onClick={ this.clickHandler } >
        <div className='card mb-4 cardContainer'>
          <div className="overlayContainer">
            <img className='card-img cardImg product-img' style={{ 'backgroundImage': `url(${this.props.product.image})` }} />
            <button className="overlay" onClick={ this.addHandler }>Add to Cart</button>
          </div>

          <div className='card-body text-center'>
            <h5 className='card-title mb-1 product-item-card-title'>{ this.props.product.name }</h5>
            {/* REMOVE ONCE DATABASE IS UPDATED */}
            { this.props.product.specifications && <p className="card-text mb-1 text-secondary product-item-card-text">{this.props.product.specifications.type}</p> }
            <p className='card-text text-secondary product-item-card-text'>${ (this.props.product.price / 100).toFixed(2)}</p>
            {/* <p className='card-text'>{ this.props.product.shortDescription}</p> */}
            <button className="btn btn-outline-primary btn-block product-list-item">More Info</button>
          </div>
        </div>
      </div>
    );
  }

}

export default ProductListItem;
