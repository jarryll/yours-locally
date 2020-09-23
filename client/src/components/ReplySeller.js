import React, { useState } from 'react';
import Cookies from 'js-cookie';

function ReplySeller({item}) {
  const [reply, setReply] = useState('');
  let respondentId = Cookies.get('random');
  let enquiryId = item.id;
  let enquirerId = item.enquirer_id;
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const body = { reply,respondentId,enquiryId,enquirerId }
      const response = await fetch("/seller/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = `/inbox/${respondentId}`
      console.log(response);
    } catch (err) {
      throw new Error("ERRORRRR")
    }
  }
  const handleReplyChange = (e) => {
    setReply(e.target.value)
  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${item.id}reply`}
      >
        Reply Enquiry
      </button>
      <div
        className="modal"
        id={`id${item.id}reply`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Reply to enquiry</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              Query:
              <input
                type="text"
                className="form-control"
                value={item.query}
                readOnly
              />
                Reply:
              <textarea
                type="text"
                className="form-control"
                value={reply}
                onChange={e => handleReplyChange(e)}
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

export default ReplySeller
