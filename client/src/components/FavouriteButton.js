// import React, {useState, useEffect} from 'react';
import React from 'react';

function FavouriteButton(props) {

    // RECEIVE PROPS FROM SHOP DETAILS
    const { sellerId, userId, shopId, hasFavourited, setHasFavourited, shop } = props;

    let favouriteCount = shop.favourites_count;

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
                setHasFavourited(true)
                favouriteCount += 1;
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
                setHasFavourited(true)
                favouriteCount += 1;
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
                setHasFavourited(false)
                if (favouriteCount <= 0) {
                    favouriteCount = 0;
                    } else {
                    favouriteCount -= 1
                }   
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
                setHasFavourited(false)
                if (favouriteCount <= 0) {
                    favouriteCount = 0;
                    } else {
                    favouriteCount -= 1
                }
            } catch (err) {
                console.log(err.stack)
            }

        } else {
            console.log('something went wrong with the unfavourite process')
        }
    }

    const handleClick = async (e) => {
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

          <div>
               <h3 class="text-center font-weight-light mt-1">{favouriteCount} user(s) liked this shop</h3>
          </div>
          <div>
             { hasFavourited ? <button className="btn btn-danger" value={shopId} onClick={(e)=>handleClick(e)}>Unsayang this shop</button> : <button className="btn btn-success" value={shopId} onClick={(e)=>handleClick(e)} >Sayang this shop!</button> }
          </div>
        </div>
        
    )
}

export default FavouriteButton

