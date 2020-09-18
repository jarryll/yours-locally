import React, { useState, useEffect } from 'react';

function CreateListing({id,categoryId}) {

     const [listing_name, setListing_name] = useState('');
     const [listing_details, setListing_details] = useState('');
     const [image_url, setImage_url] = useState('');


     const handleClick = async (e) => {
        e.preventDefault();
     try{
        const body = {id, categoryId, listing_name,listing_details,image_url}
        const response = await fetch("/listings/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        window.location = `/shop/${id}`
     } catch (err) {
        throw new Error ("ERRORRRR")
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


    return(
        <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${id}listing`}
      >
        Add Listing
      </button>

      <div
        class="modal"
        id={`id${id}listing`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add New Listing</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
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
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={e => handleClick(e)}
              >
                Add
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

export default CreateListing