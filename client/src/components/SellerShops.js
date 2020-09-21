import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateShop from './CreateShop'

function SellerShops(props) {


    const [sellerShops, setSellerShops] = useState([]);

    useEffect(() => {

        const getSellerShops = async () => {

            const { sellerId } = props;
            console.log(sellerId)

            const results = await fetch(`/seller/${sellerId}/shops`);
            const sellerShops = await results.json();
            setSellerShops(sellerShops);
        }

        getSellerShops();
    }, []);


    let allShops = sellerShops.map((item, index) => {
        return (
            <div key={index} className="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{ display: 'inline-block', maxHeight: '600px' }}>
                <div style={{ height: '400px' }} className="d-flex"><img className="card-img-top" src={item.image_url} alt="shop cover" style={{ objectFit: 'fill', margin: 'auto 0', alignSelf: 'center' }} /></div>
                <div className="card-body mx-auto text-center">
                    <h5 className="card-title">{item.shop_name}</h5>
                    <p className="card-text"><small className="text-muted">{item.about}</small></p>
                    <Link to={`/shop/${item.id}`} key={index} className="btn btn-primary ">Visit Me</Link>
                </div>
            </div>
        )
    })

    return (
        <div>
            <h3 className="font-weight-light text-center mt-4">Your shops</h3>
            <br />
            <div className="row  d-flex justify-content-center">
                {allShops}
            </div>
            <br />
            <div className="text-center"><CreateShop id={props.sellerId} /></div>
        </div>
    )
}

export default SellerShops
