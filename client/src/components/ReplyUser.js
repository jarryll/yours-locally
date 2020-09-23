import React, { useState } from 'react';
import Cookies from 'js-cookie';

function ReplyUser({item}) {

  const [queryz, setQueryz] = useState('');
  let itemName = item.listing_name;
  let enquirerId = item.enquirer_id;
  let enquirerName = item.enquirer_name;
  let emailAdd = item.email_address;
  let shopId = item.shop_id;
  let reply = item.reply

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const body = { itemName,enquirerId,enquirerName,emailAdd, queryz, shopId }
      const response = await fetch("/user/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = `/inbox/user/${Cookies.get('user')}`
      console.log(response);
    } catch (err) {
      throw new Error("ERRORRRR")
    }
  }


  const handleQueryChange = (e) => {
    setQueryz(e.target.value)
  }


  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${item.responseid}enquiry`}
      >
        Reply Seller
      </button>

      <div
        className="modal"
        id={`id${item.responseid}enquiry`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Reply to Seller</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">

              Seller Reply:
              <input
                type="text"
                className="form-control"
                value={item.reply}
                readOnly
              />

                Your Reply:
              <textarea
                type="text"
                className="form-control"
                value={queryz}
                onChange={e => handleQueryChange(e)}
                rows='4'
              >
              </textarea>
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

export default ReplyUser