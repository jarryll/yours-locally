import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SellerShops(props) {

    const [sellerShops, setSellerShops] = useState([]);

    useEffect(() => {
        getSellerShops();
    }, []);

    const getSellerShops = async () => {

        const { sellerId } = props;

        const results = await fetch(`/seller/${sellerId}/shops`);
        const sellerShops = await results.json();
        setSellerShops(sellerShops);
    }

    let allShops = sellerShops.map((item, index) => {
        return (
            <Link to={`/shop/${item.id}`} key={index}>
                <div>
                    <div><img src={item.image_url} alt={item.shop_name} /></div>
                    <div>{item.shop_name}</div>
                </div>
            </Link>
        )
    })

    return (
        <div>
            <br /><br />
            <div>Your shops</div>
            <br />
            {allShops}
        </div>
    )
}

export default SellerShops
