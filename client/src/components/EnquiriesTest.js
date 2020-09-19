import React, { useState, useEffect } from 'react';

function EnquiriesTest ({item,id}) {

//item_name, name, email, enquiry
const [listing_name, setListing_name] = useState(item.listing_name);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [enquiry, setEnquiry] = useState('');
const [successEnquiry, setSuccessEnquiry] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {listing_name,name,email,enquiry,id}
        try {
            const response = await fetch('/enquire', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

        setSuccessEnquiry(true);
        setListing_name('')
        setName('')
        setEmail('')
        setEnquiry('')
        setTimeout(() => {
            setSuccessEnquiry(false);
        }, 3000)

        } catch (err) {
            console.log(err)
            throw new Error("failed to submit query")
        }
    }

    const handleListingNameChange = (e) => {
        setListing_name(e.target.value)
        }
    const handleNameChange = (e) => {
        setName(e.target.value)
        }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        }
    const handleEnquiryChange = (e) => {
        setEnquiry(e.target.value)
        }


if(successEnquiry){
    return(
<h5>Enquiry submitted successfully</h5>
        )
}

    return (

        <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${id}listing`}
      >
        Click me to Enquire!
      </button>

      <div
        class="modal"
        id={`id${id}listing`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">{`Add New Enquiry for ${item.listing_name}`}</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
                Item:
              <input
                type="text"
                className="form-control"
                value={listing_name}
                onChange={e => handleListingNameChange(e)}
                readOnly
              />
                Your Name:
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => handleNameChange(e)}
                />

              Your Email
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={e => handleEmailChange(e)}
              />
            </div>
            Enquiry Details:
            <textarea
                type="text"
                className="form-control"
                value={enquiry}
                onChange={e => handleEnquiryChange(e)}
                rows='6'
                ></textarea>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={e => handleSubmit(e)}
              >
                Enquire
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

export default EnquiriesTest
