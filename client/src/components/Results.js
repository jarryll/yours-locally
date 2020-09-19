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
             <div class="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{display:'inline-block',maxHeight:'600px'}}>
              <div style={{height:'400px'}} class="d-flex"><img class="card-img-top" src={item.image_url} alt="Card image cap" style={{objectFit:'fill', margin:'auto 0',alignSelf:'center',maxHeight:'300px'}}/></div>
              <div class="card-body mx-auto text-center">
                <h5 class="card-title">{item.listing_name}</h5>
                <p class="card-text"><small class="text-muted">{item.listing_details}</small></p>
                <Link to={`/shop/${item.shop_id}`} key={index} className="btn btn-primary ">Visit Me</Link>
              </div>
            </div>
        )
    })
    return (
        <div>
        <h3 class ="font-weight-light text-center mt-4">You searched for: {props.query}</h3> <br/>
        <div class="row  d-flex justify-content-center">
            {listings}
        </div>
        <div class="text-center">
            <button class="btn btn-warning" onClick={()=>window.location='/'}>Back to shops</button>
        </div>
        </div>
    )
}
export default Results