import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";


class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: this.props.product.images[0],
      touch: false
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);
    this.touchStartHandler = this.touchStartHandler.bind(this);
    this.touchEndHandler = this.touchEndHandler.bind(this);

  }

  clickHandler() {
    this.props.history.push('/product/'+ this.props.product.id )
  }

  addHandler(event) {
    event.stopPropagation();
    this.props.addHandler(this.props.product, 1);
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
    if ( this.props.product.images[1]){
      this.setState({ img: this.props.product.images[1] });
    }
  }

  mouseLeaveHandler() {
    this.setState({ img: this.props.product.images[0] })
  }

  touchStartHandler(){
    this.setState({ touch: true})
  }

  touchEndHandler(){
    this.setState({touch: false})
  }

  render() {
    return (
      <div className='col-12 col-sm-6 col-md-4 col-lg-3 card-group px-1 cursor' onClick={ this.clickHandler } onTouchStart={ this.touchStartHandler } onTouchEnd={ this.touchEndHandler } >
        <div className='card mb-2 pb-2 cardContainer'>
          <div className="overlayContainer">
            <img className='card-img cardImg product-img' style={{ 'backgroundImage': 'url(' + this.state.img + ')' }} onMouseEnter={ this.mouseEnterHandler } onMouseLeave={ this.mouseLeaveHandler }/>
            <button className={'overlay'} onClick={ this.addHandler } onTouchEnd={ this.state.touch ? this.addHandler : undefined } >Add to Cart</button>
          </div>

          <div className='card-body text-center px-2 pt-2 pb-0'>
            <h5 className='card-title mb-1 product-item-card-title'>{ this.props.product.name }</h5>
            { this.props.product.specifications && <p className="card-text mb-1 text-secondary product-item-card-text">{this.props.product.specifications.type}</p> }
            <p className='card-text text-secondary product-item-card-text'>${ this.productPrice() }</p>

          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(ProductListItem);
