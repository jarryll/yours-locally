import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ReplyUser from './ReplyUser';

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

    console.log(responses)

    let thread = responses.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.shop_name}</td>
                <td>{item.listing_name}</td>
                <td>{item.query}</td>
                <td>{item.reply}</td>
                <td><ReplyUser item={item} /></td>
            </tr>
        )
    })

    return (
        // <div>

        <div className="container">
            <br />
            <h1>Your Inbox</h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Shop Name</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Query</th>
                        <th scope="col">Their Reply</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>

                </thead>

                {thread}
            </table>

        </div>

    )
}

export default UserInbox