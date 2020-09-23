import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ReplySeller from './ReplySeller';

function Inbox({ match }) {

    const [enquiries, setEnquiries] = useState([]);
    const [didDelete, setDidDelete] = useState(false);
    const [question, setQuestion] = useState([]);

    const fetchEnquiries = async () => {
        try {
            const response = await fetch(`/enquiries/${match.params.seller_id}`);
            const results = await response.json();
            setEnquiries(results);
        } catch (err) {
            console.log(err.stack)
        }
    }

    const handleDelete = async (e) => {
        try {
            await fetch(`/deleteEnquiry/${e.target.id}`, {
                method: 'DELETE'
            })
            setDidDelete(true)
        } catch (err) {
            console.log(err.stack);
        }
    }

    const fetchQuestion = async () => {
        try {
            const response = await fetch(`/userqueries/${match.params.seller_id}`);
            const results = await response.json();
            setQuestion(results);
        } catch (err) {
            console.log(err.stack)
        }
    }



    useEffect(() => {
        fetchQuestion();
        fetchEnquiries();
    }, [])

    useEffect(() => {
        fetchEnquiries();
        setDidDelete(false);
    }, [didDelete])


    const enquiryList = enquiries.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.shop_name}</td>
                <td>{item.item_name}</td>
                <td>{item.enquirer_name}</td>
                <td>{item.email_address}</td>
                <td>{item.query}</td>
                <td>{question[index] != undefined ? question[index].reply : null}</td>
                <td><ReplySeller item={item} /></td>

                <td><button id={item.id} onClick={(e) => handleDelete(e)} className="btn btn-outline-danger">Delete</button></td>
            </tr>
        )
    })

    if (Cookies.get('random') != match.params.seller_id) {
        return (
            <div class="d-flex justify-content-center align-items-center" style={{ height: '700px' }}>
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <h3>You are at the wrong <strong>inbox!</strong> Please close this modal to return to the correct inbox.</h3>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={() => window.location = `/inbox/${Cookies.get('random')}`}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <br />
            <h1>Your Inbox</h1>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Shop Name</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">From</th>
                        <th scope="col">Email Address</th>
                        <th scope="col">Query</th>
                        <th scope="col">Your Reply</th>
                        <th scope="col">ID</th>
                        <th scope="col"></th>
                    </tr>

                </thead>

                {enquiryList}
            </table>

        </div>

    )
}

export default Inbox