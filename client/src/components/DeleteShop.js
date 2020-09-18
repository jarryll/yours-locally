import React, { useState, useEffect } from "react";

const DeleteShop =  ({ id }) => {
const deleteShop = async id => {
    try {
      const deleteTodo = await fetch(`/shops/${id}`, {
        method: "DELETE"
      });
      window.location = '/';
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
        data-target={`#id${id}2`}
      >
        Delete
      </button>

      <div
        class="modal"
        id={`id${id}2`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Delete Shop</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
               <h3>Are you sure you want to delete your shop?</h3>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => deleteShop(id)}
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

export default DeleteShop