import React, { useState, useEffect } from "react";

const DeleteListing =  ({ listingId,id }) => {


const handleClick = async listingId => {
    try {
        console.log(listingId)
      const deletedListing = await fetch(`/listings/delete/${listingId}`, {
        method: "DELETE"
      });
      window.location = `/shop/${id}`;
    } catch (err) {
      console.error(err.message);
    }
  };

    return(
    <div>
      <button
        type="button"
        class="btn btn-danger"
        data-toggle="modal"
        data-target={`#id${listingId}deletelisting`}
      >
        Delete
      </button>

      <div
        class="modal"
        id={`id${listingId}deletelisting`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Delete Listing</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
               <h3>Are you sure you want to delete your listing?</h3>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => handleClick(listingId)}
              >
                Delete
              </button>
              <button
                type="button"
                class="btn btn-warning"
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