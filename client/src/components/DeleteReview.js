import React, { useState, useEffect } from "react";

const DeleteReview =  ({ item,shop }) => {


const handleClick = async id => {
    try {
      const deletedReview = await fetch(`/review/delete/${id}`, {
        method: "DELETE"
      });
      window.location = `/shop/${shop.id}`;
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
        data-target={`#id${item.id}deletereview`}
      >
        Delete
      </button>

      <div
        class="modal"
        id={`id${item.id}deletereview`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Delete Review</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
               <h3>Are you sure you want to delete your review?</h3>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => handleClick(item.id)}
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

export default DeleteReview