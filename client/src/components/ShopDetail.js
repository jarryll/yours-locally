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
              <div class="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{display:'inline-block',maxHeight:'600px'}} key={index}>
              <div style={{height:'400px'}} class="d-flex"><img class="card-img-top" src={item.image_url} alt={item.listing_name} style={{objectFit:'fill', margin:'auto 0',alignSelf:'center',maxHeight:'300px'}}/></div>
              <div class="card-body mx-auto text-center">
                <h5 class="card-title">{item.listing_name}</h5>
                <p class="card-text"><small class="text-muted">{item.listing_details}</small></p>
                <p class="card-text"><small class="text-muted">Item(s) Left: {item.quantity}</small></p>
                <p class="card-text"><small class="text-muted">${item.price}</small></p>
                <Enquiries item={item} id={match.params.id} />
                <br />
                { isSeller ? <EditListing id={match.params.id} item={item} /> : null }
              </div>
            </div>
        )
    })


    return (
        <div>
            <h4 class ="font-weight-lighter text-center mt-4">Welcome to </h4>
            <h3 class="font-weight-normal text-center mt-1 mb-4">{shop.shop_name}</h3>
            <div class="d-flex justify-content-center mb-4">
            { isSeller ? <EditShop shop={shop}/> :null }
            </div>
            <div style={{height:'400px'}} class="d-flex"><img class="card-img-top mb-4" src={shop.image_url} alt={shop.shop_name} style={{objectFit:'contain'}}/></div>
            <h3 class="font-weight-normal text-center mt-1 mb-4">What we do</h3>
            <p class="text-center">{shop.about}</p>
            <h3 class="font-weight-normal text-center mt-1 mb-4">Our products</h3>
            <div class="row  d-flex justify-content-center">
            {allListings}
            </div>
            <div class="d-flex justify-content-center">
            { isSeller ? <CreateListing id={shop.id} categoryId={shop.category_id} /> : null }
            </div>
        </div>
    )
}

export default ShopDetail
