import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function UserInbox() {

    const [userId] = useState(Cookies.get('user'));
    const [responses, setUserResponses] = useState([])

    // query Enquiries Model to see which are the enquiries submitted by user, returning enquiries.id

    // query Responses model to select all responses to enquiry id WHERE enquirer id = userId

    // map function display all


    const fetchResponses = async () => {
        const res = await fetch(`/responses/${userId}`)
        const responses = await res.json();
        setUserResponses(responses)
    }


    useEffect(() => {
        fetchResponses();
    }, [])

    let thread = responses.map((item, index) => {
        return (
            <div key={index}>
                <p>You asked a question about the <strong>{item.listing_name}</strong> from <strong>{item.shop_name}</strong></p>
                <strong>Your Question:</strong> {item.query}
                <br />
                <strong>Reply:</strong> {item.reply}
                <br /><br />
            </div>
        )
    })

    return (
        <div>
            <h1>This is the user inbox</h1>
            <br />
            { thread}
        </div>

    )
}

export default UserInbox