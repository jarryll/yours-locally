import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function Enquiries({ item, id }) {

  //item_name, name, email, enquiry
  const [listing_name, setListing_name] = useState(item.listing_name);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enquiry, setEnquiry] = useState('');
  const [successEnquiry, setSuccessEnquiry] = useState(false);

  const [userId, setUserId] = useState()
  useEffect(() => {
    const checkIfUser = () => {
      if (Cookies.get('user')) {
        setUserId(Cookies.get('user'));
      }
    }
    checkIfUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { listing_name, userId, name, email, enquiry, id }
    try {
      const response = await fetch('/enquire', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      console.log(response);

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


  if (successEnquiry) {
    return (
      <h5>Enquiry submitted successfully</h5>
    )
  }

  return (

    <div>
      <form>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${item.id}listing`}
      >
        Click me to Enquire!
      </button>

      <div className="modal" id={`id${item.id}listing`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{`Add New Enquiry for ${item.listing_name}`}</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

  
            <div className="modal-body">
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
                type="email"
                className="form-control"
                value={email}
                onChange={e => handleEmailChange(e)}
              />
 
            Enquiry Details:
            <textarea
              type="text"
              className="form-control"
              value={enquiry}
              onChange={e => handleEnquiryChange(e)}
              rows='6'
            ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={e => handleSubmit(e)}
              >
                Enquire
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
      </form>
    </div>

  )

}

export default Enquiries
