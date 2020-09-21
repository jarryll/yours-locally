import React, { useState, useEffect } from 'react';

// Packages
import Cookies from 'js-cookie';
import moment from 'moment';

//Components
import Enquiries from './Enquiries';
import EditShop from './EditShop';
import CreateListing from './CreateListing';
import EditListing from './EditListing';
import NewReview from './NewReview';
import FavouriteButton from './FavouriteButton';


function ShopDetail({ match }) {

    //STATES
    const [shop, setShop] = useState({});
    const [listings, setListings] = useState([]);

    const [showEnquiries, setShowEnquiries] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [enquiry, setEnquiry] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [enquirer, setEnquirer] = useState("");
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(Cookies.get('user'));
    const [userReview, setUserReview] = useState(false);
    const [sellerId, setSellerId] = useState(Cookies.get('random'));
    const [hasFavourited, setHasFavourited] = useState(false); 

    // FOR COOKIES
    let isSeller = false;
    let isLoggedIn = false;

    // COMPONENT DID MOUNT - FETCH SHOP AND LISTINGS
    useEffect(() => {
        fetchShop();
        fetchShopListings();
        fetchShopReviews();
        fetchAvgRating();
        fetchFavouriteStatus();
    }, []);

    // LOGIC TO RENDER ABILITY TO EDIT SHOP LISTINGS AND SHOP DETAILS
    if (Cookies.get('random') == shop.seller_id) {
        isSeller = true;
    }

    useEffect(()=> {
        fetchShop();
    }, [hasFavourited]);

    // LOGIC TO CHECK SELLER / USER STATUS
     if(Cookies.get('random') == shop.seller_id){
            isSeller = true;
        }

    if (Cookies.get('random') || Cookies.get('user')) {
            isLoggedIn = true;
        }

    // HELPER FUNCTIONS
    const fetchShop = async () => {
        const fetchShop = await fetch(`/shops/${match.params.id}`)
        const shop = await fetchShop.json();
        setShop(shop[0])
    }

    // FETCH ALL LISTINGS FOR CURRENT SHOP
    const fetchShopListings = async () => {
        const results = await fetch(`/shops/${match.params.id}/listings`)
        const allListings = await results.json();
        setListings(allListings);
    }

    // FETCH ALL REVIEWS FOR CURRENT SHOP
    const fetchShopReviews = async () => {
        const results = await fetch(`/shops/${match.params.id}/reviews`);
        const reviews = await results.json();
        setReviews(reviews);
    }

    // FETCH AVG RATING FOR CURRENT SHOP
    const fetchAvgRating = async () => {
        const results = await fetch(`/shop/${match.params.id}/average_rating`)
        const rating = await results.json();
        setAvgRating(rating[0]);
    }
    
    // FETCH INFO ON WHETHER USER/SELLER HAS ALREADY FAVOURITED THE SHOP
     const fetchFavouriteStatus = async () => {
        if (sellerId !== undefined) {
            const response = await fetch(`/favourites/seller?id=${sellerId}&shop=${match.params.id}`)
            const favouriteStatus = await response.json();
            if (favouriteStatus.rowCount > 0) {setHasFavourited(true)}
        } else if (userId !== undefined) {
            const response = await fetch(`/favourites/user?id=${userId}&shop=${match.params.id}`)
            const favouriteStatus = await response.json();
            if (favouriteStatus.rowCount > 0) {setHasFavourited(true)}
        } else {
            console.log("something went wrong with fetching favourite status")
        }
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

        let date = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss');

        return (
            <div key={index}>
                <div>{item.username}</div>
                <div>{item.rating}</div>
                <div>{item.review}</div>
                <div>{date}</div>
                <br />

            </div>
        )
    })

    return (
        <div>
            <h1>You are at {shop.shop_name}</h1>
            <img src={shop.image_url} />
            <h3>{shop.about}</h3>
            <h1>{shop.favourites_count} people have liked this shop</h1>
            { isLoggedIn ? <FavouriteButton sellerId={sellerId}userId={userId} shopId={shop.id} shopDetails={shop} hasFavourited={hasFavourited} setHasFavourited={setHasFavourited}/> : null }
         
            {allListings}


            { showEnquiries ? <Enquiries selectedItem={selectedItem} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} /> : null}
         

            { isSeller ? <CreateListing id={shop.id} categoryId={shop.category_id} /> : null}

            <br />
            <div>
                <h5>Reviews</h5>
                <br />
                {avgRating.round}/5 with {avgRating.count} reviews
                <br /><br />
                {allReviews}
                {!isSeller && isloggedIn ? <NewReview userId={userId} shop={shop} /> : null}
            </div>

            { isSeller ? <EditShop shop={shop} /> : null}

        </div>
    )
}

export default ShopDetail
