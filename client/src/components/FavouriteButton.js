// import React, {useState, useEffect} from 'react';
import React from 'react';

function FavouriteButton(props) {

    // RECEIVE PROPS FROM SHOP DETAILS
    const { sellerId, userId, shopId, hasFavourited, setHasFavourited } = props;

    // FUNCTION TO HANDLE THE FAVOURITING
    const handleFavourite = async () => {
        if (sellerId !== undefined) {
            try {
                const body = { sellerId, shopId }
                const response = await fetch('/favourites/addSellerFavourites', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                console.log(response);
            } catch (err) {
                throw new Error("Something went wrong with adding seller favourites")
            }
        } else if (userId !== undefined) {
            try {
                const body = { userId, shopId }
                const response = await fetch('/favourites/addUserFavourites', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                const favouritesId = await response.json();
                console.log(favouritesId)
            } catch (err) {
                throw new Error("Something went wrong with adding user favourites")
            }
        } else {
            console.log("something went wrong with the favouriting process")
        }
    }

    const handleUnfavourite = async () => {
        if (sellerId !== undefined) {
            try {
                const body = { sellerId, shopId }
                const response = await fetch('/favourites/sellerUnfavourite', {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                console.log(response);
            } catch (err) {
                console.log(err.stack)
            }

        } else if (userId !== undefined) {
            console.log("unfavouriting triggered")
            try {
                const body = { userId, shopId }
                const response = await fetch('/favourites/userUnfavourite', {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                console.log(response);
            } catch (err) {
                console.log(err.stack)
            }

        } else {
            console.log('something went wrong with the unfavourite process')
        }
    }


    const handleClick = async (e) => {
        setHasFavourited(!hasFavourited)
        switch (hasFavourited) {
            case (true):
                handleUnfavourite();
                console.log("you have unfavourited")
                break;
            case (false):
                handleFavourite();
                console.log("you have clicked favourite")
                break;
            default:
                console.log("something went wrong")
        }
    }



    return (
        <div>
             { hasFavourited ? <button className="btn btn-danger" value={shopId} onClick={(e)=>handleClick(e)}>Unsayang this shop</button> : <button className="btn btn-success" value={shopId} onClick={(e)=>handleClick(e)} >Sayang this shop!</button> }
        </div>

    )
}

export default FavouriteButton

