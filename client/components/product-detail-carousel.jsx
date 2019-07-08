import React from 'react';
import { Button, Fade } from 'reactstrap';

class ProductCarousel extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      images: this.props.images,
      activeIndex: 0,
      fadeIn: true
    }
    this.clickHandler = this.clickHandler.bind( this );
  }

  clickHandler( evt ) {
    this.setState( { 
      activeIndex: this.state.images.indexOf( evt.currentTarget.src ),
      fadeIn: !this.state.fadeIn
    }, () => this.setState( { fadeIn: true}));
  }

  renderThumbnail(){
    return this.props.images.map( (image, index ) => {
      return (
        <img key={index} className="carousel-side-img img-thumbnail m-1" src={image} alt="product image" width="100vw" onClick={ this.clickHandler }/>
      )
    });

  }


  render() {
    return (
      <div className="container-fluid">
          <div className="row h-75">
              <div className="col-12 carousel-img-container mb-1">
                {/* <Fade in={this.state.fadeIn} tag="img" className="carousel-img" style={{'backgroundImage': `url(${this.state.images[this.state.activeIndex]}`}} /> */}
                <div className="carousel-img" style={{'backgroundImage': `url(${this.state.images[this.state.activeIndex]}`}} alt=""/>
              </div>

          </div>
          <div className="row justify-content-center">
            { this.renderThumbnail() }
          </div>
      </div>
    )
  }
}

export default ProductCarousel;