import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateShop from './CreateShop'

function SellerShops(props) {

    const [sellerShops, setSellerShops] = useState([]);

    useEffect(() => {
        getSellerShops();
    }, []);

    const getSellerShops = async () => {

        const { sellerId } = props;
        console.log(sellerId)

        const results = await fetch(`/seller/${sellerId}/shops`);
        const sellerShops = await results.json();
        setSellerShops(sellerShops);
    }

    let allShops = sellerShops.map((item, index) => {
        return (
                <div class="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{display:'inline-block',maxHeight:'600px'}}>
              <div style={{height:'400px'}} class="d-flex"><img class="card-img-top" src={item.image_url} alt="Card image cap" style={{objectFit:'fill', margin:'auto 0',alignSelf:'center'}}/></div>
              <div class="card-body mx-auto text-center">
                <h5 class="card-title">{item.shop_name}</h5>
                <p class="card-text"><small class="text-muted">{item.about}</small></p>
                <Link to={`/shop/${item.id}`} key={index} className="btn btn-primary ">Visit Me</Link>
              </div>
            </div>
        )
    })

    return (
        <div>
            <h3 class ="font-weight-light text-center mt-4">Your shops</h3>
            <br />
            <div class="row  d-flex justify-content-center">
            {allShops}
            </div>
            <br />
            <div class="text-center"><CreateShop id={props.sellerId}/></div>
        </div>
    )
}

export default SellerShops
