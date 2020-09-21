import React, { useState, useEffect } from 'react';
import EditShop from './EditShop';
import CreateListing from './CreateListing';
import EditListing from './EditListing';
import Enquiries from './Enquiries';
import FavouriteButton from './FavouriteButton';
import Cookies from 'js-cookie';

function ShopDetail({ match }) {

    //STATES
    const [shop, setShop] = useState({});
    const [listings, setListings] = useState([]);
    const [sellerId, setSellerId] = useState(Cookies.get('random'));
    const [userId, setUserId] = useState(Cookies.get('user'));
    const [hasFavourited, setHasFavourited] = useState(false);

    // FOR COOKIES
    let isSeller = false;
    let isLoggedIn = false;

    // COMPONENT DID MOUNT - FETCH SHOP AND LISTINGS
    useEffect(() => {
        fetchShop();
        fetchShopListings();
        fetchFavouriteStatus();
    }, []);

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

    const fetchShopListings = async () => {
        const results = await fetch(`/shops/${match.params.id}/listings`)
        const allListings = await results.json();
        setListings(allListings);
    }


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
            <h1>{shop.favourites_count} people have liked this shop</h1>
            { isLoggedIn ? <FavouriteButton sellerId={sellerId}userId={userId} shopId={shop.id} shopDetails={shop} hasFavourited={hasFavourited} setHasFavourited={setHasFavourited}/> : null }
         
            {allListings}
           

            { isSeller ? <CreateListing id={shop.id} categoryId={shop.category_id} /> : null }
            { isSeller ? <EditShop shop={shop}/> :null }

        </div>
    )
}

export default ShopDetail
