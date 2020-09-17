import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Results(props) {
    const [result, setResults] = useState([]);
    useEffect(() => {
        getResults();
    }, [props.query]);
    const getResults = async () => {
        let query = props.query;
        const results = await fetch(`/results/${query}`);
        const listings = await results.json();
        setResults(listings);
    }
    let listings = result.map((item, index) => {
        return (
            <Link to={`/shop/${item.shop_id}`} key={index}>
                <div className="card">
                    <div><img src={item.image_url} /></div>
                    <div>{item.listing_name}</div>
                    <div>{item.listing_details}</div>
                </div>
            </Link>
        )
    })
    return (
        <div>
            {listings}
        </div>
    )
}
export default Results