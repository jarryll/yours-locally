import React from 'react';

function Enquiries (props) {
    let { selectedItem, handleClose, handleChange, handleSubmit } = props
    return (
        <form>
            <div>
                <label htmlFor="item-name">Item name:</label>
                <input type="text" id="item-name" value={selectedItem} readOnly />
            </div>
            <div>
                <label htmlFor="name">Your name:</label>
                <input type="text" id="name" onChange={(e) => handleChange(e)} />
            </div>
            <div>
                <label htmlFor="email">Your email:</label>
                <input type="email" id="email" onChange={(e) => handleChange(e)} required />
            </div>
            <div>
                <label htmlFor="query">Your enquiry</label>
                <textarea placeholder="Ask here!" id="query" rows={4} cols={50} onChange={(e) => handleChange(e)}/>
            </div>
            <button onClick={handleClose}>Close</button>
            <button value="Submit" onClick={(e) => handleSubmit (e)}>Submit</button>              
        </form>
   
    )
}

export default Enquiries