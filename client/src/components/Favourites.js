import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom'

function Favourites () {

    const [sellerId, setSellerId] = useState(Cookies.get('random'));
    const [userId, setUserId] = useState(Cookies.get('user'));
    const [favourites, setFavourites] = useState([]);

    useEffect(()=> {
        fetchFavourites();
    }, [])

    const fetchFavourites = async () => {
        if (sellerId !== undefined) {
            const response = await fetch (`/favourites/seller/${sellerId}`)
            const favourites = await response.json();
            setFavourites(favourites.rows)
        } else if (userId !== undefined) {
            const response = await fetch (`/favourites/user/${userId}`)
            const favourites = await response.json();
            setFavourites(favourites)
        } else {
            console.log("fetchFavourites failed")
        }
    }

    const favouritesList = favourites.map((item, index) => {
        return(
           <div class="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{display:'inline-block',maxHeight:'600px'}}>
              <div style={{height:'400px'}} class="d-flex"><img class="card-img-top" src={item.image_url} alt="Card image cap" style={{objectFit:'fill', margin:'auto 0',alignSelf:'center',maxHeight:'300px'}}/></div>
              <div class="card-body mx-auto text-center">
                <h5 class="card-title">{item.shop_name}</h5>
                <Link className="btn btn-primary" to={`/shop/${item.shop_id}`} key={index}>Visit Me </Link>
              </div>
            </div>
        )
    })

    if (!Cookies.get('random') && !Cookies.get('user')) {
        return (
            <h1>Sorry, you need to be logged in to view this page</h1>
        )
    }

    return (
        <div>
            <h1 class ="font-weight-light text-center mt-4 mb-5">Your favourites</h1>
            <div class="row  d-flex justify-content-center">
            {favouritesList}
            </div>
        </div>


    )

}

export default Favourites;