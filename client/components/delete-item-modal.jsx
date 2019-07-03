import React from 'react';

class DeleteItemModal extends React.Component {
  constructor( props ){
    super( props );
    this.dismissModal = this.dismissModal.bind( this );
    this.deleteItem = this.deleteItem.bind( this );

  }

  deleteItem(){
    this.dismissModal();
    this.props.delete( this.props.id )
  }

  dismissModal() {
    this.props.toggle()
  }

  render() {
    console.log( this.props );
    return (
      <div
        className={`modal delete-modal-container border border-dark ${this.props.showModal ? 'show' : ''}`}
        style={{
          display: `${this.props.showModal ? 'block' : 'none'}`,
        }}
        tabIndex="-1" role="dialog" aria-labelledby="credit-card-modal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content delete-modal">
            <div className="modal-header bg-danger text-white">
              <div className="camera-box">
                <h6 className="modal-title" >Do you really want to remove this item?</h6>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="d-flex justify-content-center">
                  <button className="btn btn-outline-danger mr-1" onClick={ this.deleteItem }>Confirm</button>
                  <button className="btn btn-outline-secondary ml-1" onClick={this.dismissModal}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  
  }
}

export default DeleteItemModal;
