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
import EditReview from './EditReview';


function ShopDetail({ match }) {

    //STATES
    const [shop, setShop] = useState({});
    const [listings, setListings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState([]);
    const [userId, setUserId] = useState(Cookies.get('user'));
    const [sellerId, setSellerId] = useState(Cookies.get('random'));
    const [hasFavourited, setHasFavourited] = useState(false);

    // const [showEnquiries, setShowEnquiries] = useState(false);
    // const [selectedItem, setSelectedItem] = useState("");
    // const [enquiry, setEnquiry] = useState("");
    // const [userEmail, setUserEmail] = useState("");
    // const [enquirer, setEnquirer] = useState("");
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [userReview, setUserReview] = useState(false);

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
    if (Cookies.get('random') === shop.seller_id) {
        isSeller = true;
    }

    useEffect(() => {
        fetchShop();
    }, [hasFavourited]);


    // LOGIC TO CHECK SELLER / USER STATUS
    if (Cookies.get('random') === shop.seller_id) {
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
        console.log("-----",reviews)
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
            if (favouriteStatus.rowCount > 0) { setHasFavourited(true) }
        } else if (userId !== undefined) {
            const response = await fetch(`/favourites/user?id=${userId}&shop=${match.params.id}`)
            const favouriteStatus = await response.json();
            if (favouriteStatus.rowCount > 0) { setHasFavourited(true) }
        } else {
            console.log("something went wrong with fetching favourite status")
        }
    }

    // const handleClickEnquire = (e) => {
    //     setShowEnquiries(true)
    //     setSelectedItem(e.target.id)
    // }

    // const handleClose = () => {
    //     setShowEnquiries(false)
    // }

    // const handleChange = (e) => {
    //     switch (e.target.id) {
    //         case "email":
    //             setUserEmail(e.target.value);
    //             break;
    //         case "name":
    //             setEnquirer(e.target.value);
    //             break;
    //         default:
    //             setEnquiry(e.target.value)
    //     }
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const shopId = match.params.id;
    //     const body = { selectedItem, enquirer, userEmail, enquiry, shopId }
    //     try {
    //         const response = await fetch('/enquire', {
    //             method: "POST",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(body)
    //         })
    //     } catch (err) {
    //         throw new Error("failed to submit query")
    //     }

    // }


    // Function to map results of the fetch request
    const allListings = listings.map((item, index) => {
        return (
            <div className="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{ display: 'inline-block', maxHeight: '600px' }} key={index}>
                <div style={{ height: '400px' }} className="d-flex"><img className="card-img-top" src={item.image_url} alt={item.listing_name} style={{ objectFit: 'fill', margin: 'auto 0', alignSelf: 'center', maxHeight: '300px' }} /></div>
                <div className="card-body mx-auto text-center">
                    <h5 className="card-title">{item.listing_name}</h5>
                    <p className="card-text"><small className="text-muted">{item.listing_details}</small></p>
                    <p className="card-text"><small className="text-muted">Item(s) Left: {item.quantity}</small></p>
                    <p className="card-text"><small className="text-muted">${item.price}</small></p>
                    <Enquiries item={item} id={match.params.id} />
                    <br />
                    {isSeller ? <EditListing id={match.params.id} item={item} /> : null}
                </div>
            </div>
        )
    })

    // map results of all reviews for this shop
    const allReviews = reviews.map((item, index) => {

        let date = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss');
console.log(item)
        return (
            <div key={index}>
                <div>{item.username}</div>
                <div>{item.rating}</div>
                <div>{item.review}</div>
                <div>{date}</div>
                {Cookies.get('user')==item.reviewuserid ? <EditReview item={item} shop={shop}/> : null}
                <br />

            </div>
        )
    })

    return (
        <div>
            <h4 className="font-weight-lighter text-center mt-4">Welcome to </h4>
            <h3 className="font-weight-normal text-center mt-1 mb-4">{shop.shop_name}</h3>
            <div className="d-flex justify-content-center mb-4">
                {isSeller ? <EditShop shop={shop} /> : null}
            </div>
            <div style={{ height: '400px' }} className="d-flex"><img className="card-img-top mb-4" src={shop.image_url} alt={shop.shop_name} style={{ objectFit: 'contain' }} /></div>
            <h3 className="font-weight-normal text-center mt-1 mb-4">What we do</h3>
            <p className="text-center">{shop.about}</p>
            <h3 className="font-weight-normal text-center mt-1 mb-4">Our products</h3>
            <div className="row  d-flex justify-content-center">

                <h1>{shop.favourites_count} people have liked this shop</h1>
                {isLoggedIn ? <FavouriteButton sellerId={sellerId} userId={userId} shopId={shop.id} shopDetails={shop} hasFavourited={hasFavourited} setHasFavourited={setHasFavourited} /> : null}

                {allListings}

                <div>
                    <h5>Reviews</h5>
                    <br />
                    {avgRating.round}/5 with {avgRating.count} reviews
                   <br /><br />
                    {allReviews}
                    {!isSeller && isLoggedIn ? <NewReview userId={userId} shop={shop} /> : null}
                </div>

            </div>
            <div className="d-flex justify-content-center">
                {isSeller ? <CreateListing id={shop.id} categoryId={shop.category_id} /> : null}
            </div>

        </div>
    )
}

export default ShopDetail
