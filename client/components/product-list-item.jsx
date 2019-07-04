import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: this.props.product.images[0]
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);

  }

  clickHandler() {
    this.props.detail('details', { id: this.props.product.id });
  }

  addHandler(event) {
    event.stopPropagation();
    this.props.addHandler(this.props.product);
  }

  productPrice(){
    let price = String((this.props.product.price / 100).toFixed(2))
    if ( price.length > 6 ){
      const firstSlice = price.slice(0 , price.length - 6 );
      const secondSlice = price.slice( price.length - 6 );
      price = firstSlice + ',' + secondSlice;
    }
    return price;
  }

  mouseEnterHandler(){
    this.setState({ img: this.props.product.images[1] });
  }

  mouseLeaveHandler() {
    this.setState({ img: this.props.product.images[0] })
  }

  render() {
    // this.productPrice()
    return (
      <div className='col-12 col-sm-6 col-md-4 col-lg-3 card-group px-1' onClick={ this.clickHandler } >
        <div className='card mb-2 pb-2 cardContainer'>
          <div className="overlayContainer">
            <img className='card-img cardImg product-img' style={{ 'backgroundImage': 'url(' + this.state.img + ')' }} onMouseEnter={ this.mouseEnterHandler } onMouseLeave={ this.mouseLeaveHandler }/>
            <button className="overlay" onClick={ this.addHandler }>Add to Cart</button>
          </div>

          <div className='card-body text-center px-2 pt-2 pb-0'>
            <h5 className='card-title mb-1 product-item-card-title'>{ this.props.product.name }</h5>
            {/* REMOVE ONCE DATABASE IS UPDATED */}
            { this.props.product.specifications && <p className="card-text mb-1 text-secondary product-item-card-text">{this.props.product.specifications.type}</p> }
            <p className='card-text text-secondary product-item-card-text'>${ this.productPrice() }</p>
            {/* <p className='card-text'>{ this.props.product.shortDescription}</p> */}
            {/* <button className="btn btn-outline-primary btn-block product-list-item">More Info</button> */}
          </div>
        </div>
      </div>
    );
  }

}

export default ProductListItem;
