import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.detail('details', { id: this.props.product.id });
  }

  render() {
    return (
      <div className='col-md-3 col-sm-6 card-group' onClick={ this.clickHandler } >
        <div className='card mb-4 cardContainer'>
          <div className='cardImgContainer'>
            <img className='card-img cardImg' style={{ 'backgroundImage': `url(${this.props.product.image})` }} />
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
