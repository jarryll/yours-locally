import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllShops() {

    const [allShops, setAllShops] = useState([]);

    useEffect(() => {
        getAllShops();
    }, [])

    const getAllShops = async () => {
        const results = await fetch("/allshops");
        const allShops = await results.json();
        setAllShops(allShops);
    }

    let shops = allShops.map((item, index) => {
        return (
                <div class="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{display:'inline-block',maxHeight:'600px'}}>
              <div style={{height:'400px'}} class="d-flex"><img class="card-img-top" src={item.image_url} alt="Card image cap" style={{objectFit:'contain', margin:'auto 0',alignSelf:'center'}}/></div>
              <div class="card-body mx-auto text-center">
                <h5 class="card-title">{item.shop_name}</h5>
                <p class="card-text"><small class="text-muted">{item.about}</small></p>
                <p class="card-text"><i class="fas fa-star" style={{color:'#D2AD28'}}></i>{item.average_rating}</p>
                <Link to={`/shop/${item.id}`} key={index} className="btn btn-primary">Visit Me</Link>
              </div>
            </div>
        )
    })

    return (

        <div>
            <h3 className="font-weight-light text-center mt-4">All shops</h3>
            <br />
            <div className="row  d-flex justify-content-center">
                {shops}
            </div>
        </div>

    )
}

export default AllShops
