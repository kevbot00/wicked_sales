import React from 'react';

class DemoModal extends React.Component {
  constructor( props ){
    super( props );
    this.dismissModal = this.dismissModal.bind( this );
  }

  dismissModal() {
    this.props.toggle()
  }

  render() {
    return (
      <div
        onClick={this.dismissModal}
        className={`modal border border-dark ${this.props.showModal ? 'show' : ''}`}
        style={{
          display: `${this.props.showModal ? 'block' : 'none'}`,
        }}
        tabIndex="-1" role="dialog" aria-labelledby="credit-card-modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <div className="camera-box">
                <h5 className="modal-title" id="credit-card-modal">For Demo Purposes Only</h5>
              </div>
            </div>
            <div className="modal-body">
              <p className="text-center">
                Please note that we will not save any personal information. 
                Please click anywhere on the screen to dismiss.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  
  }
}

export default DemoModal;
