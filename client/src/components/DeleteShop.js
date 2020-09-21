import React from "react";

const DeleteShop = ({ id }) => {
  const deleteShop = async id => {
    try {
      const deletedShop = await fetch(`/shops/${id}`, {
        method: "DELETE"
      });
      window.location = '/';
      console.log(deletedShop);
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
        data-target={`#id${id}2`}
      >
        Delete
      </button>

      <div
        className="modal"
        id={`id${id}2`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Delete Shop</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <h3>Are you sure you want to delete your shop?</h3>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => deleteShop(id)}
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

export default DeleteShop