import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Enquiries from './Enquiries';
import SuccessModal from './SuccessModal';
import EditShop from './EditShop';
import CreateListing from './CreateListing';
import EditListing from './EditListing';

function ShopDetail({ match }) {

    //STATES
    const [shop, setShop] = useState({});
    const [listings, setListings] = useState([]);
    const [showEnquiries, setShowEnquiries] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [enquiry, setEnquiry] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [successfulEnquiry, setSuccessfulEnquiry] = useState(false);
    const [enquirer, setEnquirer] = useState("");
    const [reviews, setReviews] = useState([]);


    // FOR COOKIES
    let isSeller = false;

    // COMPONENT DID MOUNT - FETCH SHOP AND LISTINGS
    useEffect(() => {
        fetchShop();
        fetchShopListings();
        fetchShopReviews();
    }, []);

    // LOGIC TO RENDER ABILITY TO EDIT SHOP LISTINGS AND SHOP DETAILS
    if (Cookies.get('random') == shop.seller_id) {
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

    const fetchShopReviews = async () => {
        const results = await fetch(`/shops/${match.params.id}/reviews`);
        const reviews = await results.json();
        setReviews(reviews);
    }

    const handleClickEnquire = (e) => {
        setShowEnquiries(true)
        setSelectedItem(e.target.id)
    }

    const handleClose = () => {
        setShowEnquiries(false)
    }

    const handleChange = (e) => {
        switch (e.target.id) {
            case "email":
                setUserEmail(e.target.value);
                break;
            case "name":
                setEnquirer(e.target.value);
                break;
            default:
                setEnquiry(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const shopId = match.params.id;
        const body = { selectedItem, enquirer, userEmail, enquiry, shopId }
        try {
            const response = await fetch('/enquire', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            successHandler();
        } catch (err) {
            throw new Error("failed to submit query")
        }

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
                {isSeller ? <EditListing item={item} id={match.params.id} /> : null}
                <button onClick={(e) => handleClickEnquire(e)} id={item.listing_name} type="button" className="btn btn-primary">Click me to enquire!</button>
            </div>
        )
    })

    // map results of all reviews for this shop 
    const allReviews = reviews.map((item, index) => {
        return (
            <div key={index}>
                <div>{item.username}</div>
                <div>{item.rating}</div>
                <div>{item.review}</div>
                <div>{item.created_at}</div>
                <br />
            </div>
        )
    })

    return (
        <div>
            <h1>You are at {shop.shop_name}</h1>
            <img src={shop.image_url} />
            <h3>{shop.about}</h3>
            {allListings}


            { showEnquiries ? <Enquiries selectedItem={selectedItem} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} /> : null}
            { successfulEnquiry ? <SuccessModal /> : null}

            { isSeller ? <CreateListing id={shop.id} categoryId={shop.category_id} /> : null}

            <br />
            <h5>Reviews</h5>
            {allReviews}

            { isSeller ? <EditShop shop={shop} /> : null}

        </div>
    )
}

export default ShopDetail
