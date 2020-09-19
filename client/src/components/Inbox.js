import React, { useState, useEffect } from 'react';

function Inbox ({ match }) {

    const [ enquiries, setEnquiries ] = useState([]);
    const [ didDelete, setDidDelete ] = useState(false);

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

    useEffect (() => {
        fetchEnquiries();
    }, [])

    useEffect (()=>{
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
                    <td><button id={item.id} onClick={(e)=>handleDelete(e)}>Delete</button></td>
                </tr>       
        )
    })

    return (
        <div className="container">
             <h1> You are at the inbox of Seller {match.params.seller_id}</h1>
             <table className="table">
                 <thead className="thead-dark">
                 <tr>
                     <th scope="col">Shop Name</th>
                     <th scope="col">Item Name</th>
                     <th scope="col">From</th>
                     <th scope="col">Email Address</th>
                     <th scope="col">Query</th>
                     <th scope="col"></th>
                 </tr>

                 </thead>
                 
                 {enquiryList}
             </table>

        </div>
       
    )
}

export default Inbox