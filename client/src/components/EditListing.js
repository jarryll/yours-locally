import React, { useState } from 'react';
import DeleteListing from './DeleteListing';


function EditListing({ item, id }) {

  const [listing_name, setListing_name] = useState(item.listing_name);
  const [listing_details, setListing_details] = useState(item.listing_details);
  const [image_url, setImage_url] = useState(item.image_url);
  const [quantity, setQuantity] = useState(item.quantity)
  const [price,setPrice] = useState(item.price)
  const itemId = item.id

  const setFunction = () => {
    setListing_name(item.listing_name)
    setListing_details(item.listing_details)
    setImage_url(item.image_url)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const body = { listing_name, listing_details, image_url, itemId, quantity, price }
      const response = await fetch("/listings/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = `/shop/${id}`
      console.log(response);
    } catch (err) {
      throw new Error("ERRORRRR")
    }
  }


  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${item.id}edit`}
        onClick={() => setFunction()}
      >
        Edit Listing
      </button>

      <div
        className="modal"
        id={`id${item.id}edit`}
        onClick={() => setFunction()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Listing</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setFunction()}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              Listing Name:
              <input
                type="text"
                className="form-control"
                value={listing_name}
                onChange={e => setListing_name(e.target.value)}
              />
                Listing Details:
              <textarea
                type="text"
                className="form-control"
                value={listing_details}
                onChange={e => setListing_details(e.target.value)}
                rows='4'
              >
              </textarea>
              Image:
              <input
                type="text"
                className="form-control"
                value={image_url}
                onChange={e => setImage_url(e.target.value)}
              />
              Quantity Left:
              <input
                type="text"
                className="form-control"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
              Price: $
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <DeleteListing listingId={item.id} id={id} />
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={e => handleClick(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={() => setFunction()}
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

export default EditListing