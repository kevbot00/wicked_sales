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
    return (
      <div className='col-md-4 col-sm-6 col-12 card-group' onClick={ this.clickHandler } >
        <div className='card mb-4 cardContainer'>
          <div className="overlayContainer">
            <img className='card-img cardImg' style={{ 'backgroundImage': `url(${this.props.product.image})` }} />
            <button className="overlay" onClick={ this.addHandler }>Add to Cart</button>
          </div>
          <div className='card-body'>
            <h5 className='card-title'>{ this.props.product.name }</h5>
            <p className='card-text'>${ (this.props.product.price / 100).toFixed(2)}</p>
            <p className='card-text'>{ this.props.product.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }

}

export default ProductListItem;
