import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function UserInbox() {

    const [userId] = useState(Cookies.get('user'));
    const [responses, setUserResponses] = useState([])

    // query Enquiries Model to see which are the enquiries submitted by user, returning enquiries.id

    // query Responses model to select all responses to enquiry id WHERE enquirer id = userId

    // map function display all


    const fetchResponses = async () => {
        const res = await fetch (`/responses/${userId}`)
        const responses = res.json();
        setUserResponses(responses)
    }
    

    useEffect (() => {
        fetchResponses();
    }, [])

    
    return (
        <h1>This is the user inbox</h1>
    )
}

export default UserInbox