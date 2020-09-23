import React, { useState } from 'react';
function CreateListing({ id, categoryId }) {
  const [listing_name, setListing_name] = useState('');
  const [listing_details, setListing_details] = useState('');
  const [image_url, setImage_url] = useState('');
  const [quantity, setQuantity] = useState(0)
  const [price,setPrice] = useState(0)
  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const body = { id, categoryId, listing_name, listing_details, image_url,quantity,price }
      const response = await fetch("/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = `/shop/${id}`
      console.log(response);
    } catch (err) {
      throw new Error("ERRORRRR")
    }
  }
  const handleListingNameChange = (e) => {
    setListing_name(e.target.value)
  }
  const handleListingDetailsChange = (e) => {
    setListing_details(e.target.value)
  }
  const handleImageURLChange = (e) => {
    setImage_url(e.target.value)
  }
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }
  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${id}listing`}
      >
        Add Listing
      </button>
      <div
        className="modal"
        id={`id${id}listing`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Listing</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              Listing Details:
              <input
                type="text"
                className="form-control"
                value={listing_name}
                onChange={e => handleListingNameChange(e)}
              />
                About:
              <textarea
                type="text"
                className="form-control"
                value={listing_details}
                onChange={e => handleListingDetailsChange(e)}
                rows='4'
              >
              </textarea>
              Image:
              <input
                type="text"
                className="form-control"
                value={image_url}
                onChange={e => handleImageURLChange(e)}
              />
              Quantity Left:
              <input
                type="text"
                className="form-control"
                value={quantity}
                onChange={e => handleQuantityChange(e)}
              />
              Price: $
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={e => handlePriceChange(e)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={e => handleClick(e)}
              >
                Add
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
export default CreateListing