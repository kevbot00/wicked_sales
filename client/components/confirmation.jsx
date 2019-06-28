import React from 'react';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container-fluid h-100'>
        <div className="row d-flex align-items-end">
          <h4 className="col-lg-6"></h4>
          
        </div>
        <div className="row d-flex h-100 pb-4-sm">
          <div className="col-lg-6 p-0 m-0">
            <div className="col-lg-12 row d-flex justify-content-center h-50 p-0 m-0">
              <div className="row w-100 d-flex justify-content-center">
                <i className="far fa-check-circle text-primary h-25" style={{'fontSize': '110px'}}></i>
              </div>
              <div className="row w-100 d-flex justify-content-center text-center h-25">
                Thank you for your purchase!<br/>
              {/* </div>
              <div className="row w-100 d-flex justify-content-center"> */}
                Order #9
              </div>
            </div>
            <div className="col-lg-12 row d-flex justify-content-center p-0 mx-3 mb-3">
              <h6 className="col-lg-12 row m-0 mb-sm p-0">Customer Information</h6>
              <div className="col-6">
              Shipping Address<br/>
              name<br/>
              Street<br/>
              City, STATE, ZIP<br/>
              NUMBER<br/>

              </div>
              <div className="col-6">
              Billing Address<br/>
              name<br/>
              Street<br/>
              City, STATE, ZIP<br/>
              NUMBER<br/>
              </div>
            </div>
            <div className="row w-100 d-flex justify-content-center m-0">
              <button className='btn btn-primary'>Continue Shopping</button>
            </div>
          </div>
          <div className="col-lg-6">
            <h4 className="col-lg-6 mt-4 mb-2 mt-md-0">Order Summary</h4>
            <div className="card checkoutCartContainer mt-2 h-75" style={{'height': '70vh'}}>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item pl-0 py-0 d-flex align-items-center =" style={{'minHeight': '70px'}}>
                  <img src="https://bit.ly/2JtVNE6" className="img-fluid d-none d-sm-block" style={{'maxWidth':'100px'}} alt=""/>
                  <span className="p-2">ITEM NAME</span> 
                  <span className="text-primary"> x NUM </span>
                  <span className="text-muted ml-auto p-1">
                    $ITEM PRICE
                  </span>
                </li>

                <li className="list-group-item">
                  ITEM NAME
                  <span className="text-primary"> x NUM </span>
                  <span className="float-right text-muted">
                    $ITEM PRICE
                  </span>
                </li>
              </ul>
            </div>
            <div className="card-footer checkout-footer mb-4">Total (USD) <span className="float-right text-dark">$TOTAL AMT</span></div>
          </div>
        </div>
      </div>
    )
  }
}


export default Confirmation;