import React, { useState, useEffect } from 'react';
import EditShop from './EditShop';
function ShopDetail({ match }) {

    const [shop, setShop] = useState({});
    const [listings, setListings] = useState([]);

    useEffect(()=> {
        fetchShop();
        fetchShopListings();
    }, []);

    const fetchShop = async () => {
        const fetchShop = await fetch(`/shops/${match.params.id}`)
        const shop = await fetchShop.json();
        setShop(shop[0])
    }

    const fetchShopListings = async () => {
        const results = await fetch(`/shops/${match.params.id}/listings`)
        const allListings = await results.json();
        console.log(allListings);
        setListings(allListings);
    }

    let allListings = listings.map((item, index) => {
        return (
            <div key={index}>
                <div><img src={item.image_url} alt={item.listing_name} /></div>
                <div>{item.listing_name}</div>
                <div>{item.listing_details}</div>
            </div>
        )
    })

    return (
        <div>
               <h1>You are at {shop.shop_name}</h1>
               <img src={shop.image_url}/>
               <h3>{shop.about}</h3>
               {allListings}
               <EditShop shop={shop}/>
        </div>

    )
}

export default ShopDetail