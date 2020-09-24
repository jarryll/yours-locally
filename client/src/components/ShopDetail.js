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


    useEffect(() => {
        fetchShop();
    }, [hasFavourited]);


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

    // LOGIC TO CHECK SELLER / USER STATUS
    if (Cookies.get('random') == shop.seller_id) {
        isSeller = true;
    }

    if (Cookies.get('random') || Cookies.get('user')) {
        isLoggedIn = true;
    }


    // Function to map results of the fetch request
    const allListings = listings.map((item, index) => {
        return (
            <div class="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{ display: 'inline-block', maxHeight: '600px' }} key={index}>
                <div style={{ height: '400px' }} class="d-flex"><img class="card-img-top" src={item.image_url} alt={item.listing_name} style={{ objectFit: 'contain', margin: 'auto 0', alignSelf: 'center', maxHeight: '300px' }} /></div>
                <div class="card-body mx-auto text-center">
                    <h5 class="card-title">{item.listing_name}</h5>
                    <p class="card-text"><small class="text-muted">{item.listing_details}</small></p>
                    <p class="card-text"><small class="text-muted">Item(s) Left: {item.quantity}</small></p>
                    <p class="card-text"><small class="text-muted">${item.price}</small></p>
                    {isLoggedIn? <Enquiries item={item} id={match.params.id} /> : null }
                    <br />
                    {isSeller ? <EditListing id={match.params.id} item={item} /> : null}
                </div>
            </div>
        )
    })

        

        // const handleFav = ()=>{
        //     if(!isFavourited && favouriteCount <= favLogic){
        //         favouriteCount+=1;
        //     } else if (isFavourited && favouriteCount >= favLogic){
        //         favouriteCount-=1;
        //     }
        // }

    // map results of all reviews for this shop
    const allReviews = reviews.map((item, index) => {

        let date = moment(item.created_at).format('YYYY-MM-DD HH:mm:ss');
console.log(item)
        return (
            <div class="card mb-3 col-md-auto mr-4" style={{width:'25rem'}} key={index}>
              <div class="card-body">
                <h5 class="card-title text-capitalize">{item.review}</h5>
                <h6 class="card-subtitle mb-2 text-muted">--- {item.username}</h6>
                <h6 class="card-subtitle mb-2 text-muted">{item.rating} <i class="fas fa-star" style={{color:'#D2AD28'}}></i></h6>
                <h6 class="card-subtitle mb-2 text-muted"> Last edited: {date}</h6>
                {Cookies.get('user')==item.reviewuserid ? <EditReview item={item} shop={shop}/> : null}
              </div>
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
            <div style={{ height: '400px' }} class="d-flex"><img class="card-img-top mb-4" src={shop.image_url} alt={shop.shop_name} style={{ objectFit: 'contain' }} /></div>
            <div class="d-flex justify-content-center mb-4">    {isLoggedIn ? <FavouriteButton sellerId={sellerId} userId={userId} shopId={shop.id} shopDetails={shop} hasFavourited={hasFavourited} setHasFavourited={setHasFavourited} shop={shop} /> : <h3>{shop.favourites_count} people like this shop</h3> } </div>
            <h3 class="font-weight-normal text-center mt-1 mb-4">What we do</h3>
            <p class="text-center">{shop.about}</p>
            <h3 class="font-weight-normal text-center mt-1 mb-4">Our products</h3>
            <div class="row  d-flex justify-content-center">
                {allListings}
            </div>
            <div className="d-flex justify-content-center" >
                {isSeller ? <CreateListing id={shop.id} categoryId={shop.category_id} /> : null}
            </div>
              <div>
                    <h3 className="font-weight-lighter text-center mt-1 mb-4">What others are saying</h3>
                    <h5 className="font-weight-normal text-center mt-1 mb-4"> {avgRating.count} Review(s)</h5>
                    <h5 className="font-weight-normal text-center mt-1 mb-4">{avgRating.round} <i class="fas fa-star" style={{color:'#D2AD28'}}></i></h5>
                    <div style={{width:'1500px',margin:'0 auto'}} >
                    <div class=" mb-4 mr-5 ml-5 row d-flex justify-content-center align-items-center">{allReviews}


                    </div>
                    </div>
                    <div className="d-flex justify-content-center mb-5">{!isSeller && isLoggedIn ? <NewReview userId={userId} shop={shop} /> : null}</div>
                </div>

        </div>
    )
}

export default ShopDetail
