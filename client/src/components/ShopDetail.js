import React, { useState, useEffect } from 'react';
import SuccessModal from './SuccessModal';
import EditShop from './EditShop';
import CreateListing from './CreateListing';
import EditListing from './EditListing';
import Enquiries from './Enquiries';
import Cookies from 'js-cookie';

function ShopDetail({ match }) {

    //STATES
    const [shop, setShop] = useState({});
    const [listings, setListings] = useState([]);
    const [showEnquiries, setShowEnquiries] = useState(false);
    const [successfulEnquiry, setSuccessfulEnquiry] = useState(false);


    // FOR COOKIES
    let isSeller = false;

    // COMPONENT DID MOUNT - FETCH SHOP AND LISTINGS
    useEffect(() => {
        fetchShop();
        fetchShopListings();
    }, []);

    // LOGIC TO RENDER ABILITY TO EDIT SHOP LISTINGS AND SHOP DETAILS
     if(Cookies.get('random') == shop.seller_id){
            isSeller = true;
        }

    // HELPER FUNCTIONS
    const fetchShop = async () => {
        const fetchShop = await fetch(`/shops/${match.params.id}`)
        const shop = await fetchShop.json();
        setShop(shop[0])
    }

    const fetchShopListings = async () => {
        const results = await fetch(`/shops/${match.params.id}/listings`)
        const allListings = await results.json();
        setListings(allListings);
    }

    const successHandler = () => {
        setSuccessfulEnquiry(true);
        setShowEnquiries(false);
        setTimeout(() => {
            setSuccessfulEnquiry(false);
        }, 2000)
    }


    // Function to map results of the fetch request
    const allListings = listings.map((item, index) => {
        return (
            <div key={index}>
                <div><img src={item.image_url} alt={item.listing_name} /></div>
                <div>{item.listing_name}</div>
                <div>{item.listing_details}</div>
                <div>Item(s) Left: {item.quantity}</div>
                <div>${item.price}</div>
               {isSeller ? <EditListing item={item} id={match.params.id}/> : null}
               <Enquiries item={item} id={match.params.id} />
            </div>
        )
    })


    return (
        <div>
            <h1>You are at {shop.shop_name}</h1>
            <img src={shop.image_url} />
            <h3>{shop.about}</h3>
            {allListings}

            { isSeller ? <CreateListing id={shop.id} categoryId={shop.category_id} /> : null }
            { isSeller ? <EditShop shop={shop}/> :null }

        </div>
    )
}

export default ShopDetail
