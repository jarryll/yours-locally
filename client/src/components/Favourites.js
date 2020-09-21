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
          <Link to={`/shop/${item.shop_id}`} key={index}>
            <div>
                  <img src={item.image_url} alt={item.shop_name} />
                    <div>{item.shop_name}</div>
                </div>
            </Link>
        )
    })

    if (!Cookies.get('random') && !Cookies.get('user')) {
        return (
            <h1>Sorry, you need to be logged in to view this page</h1>
        )
    }

    return (
        <div>
            <h1>You are in the favourites page</h1>
            {favouritesList}
        </div>


    )
    
}

export default Favourites;