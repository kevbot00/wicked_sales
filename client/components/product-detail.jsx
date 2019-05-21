import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products?id=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json());
    // .then(data => console.log(data));
  }

  render() {
    return (
      <div>

      </div>
    );
  }

}

export default ProductDetails;
