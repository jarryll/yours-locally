import React from "react";

const DeleteListing = ({ listingId, id }) => {


  const handleClick = async listingId => {
    try {
      console.log(listingId)
      const deletedListing = await fetch(`/listings/delete/${listingId}`, {
        method: "DELETE"
      });
      window.location = `/shop/${id}`;
      console.log(deletedListing);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-danger"
        data-toggle="modal"
        data-target={`#id${listingId}deletelisting`}
      >
        Delete
      </button>

      <div
        className="modal"
        id={`id${listingId}deletelisting`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Delete Listing</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <h3>Are you sure you want to delete your listing?</h3>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => handleClick(listingId)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )


}

export default DeleteListing