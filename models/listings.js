module.exports = (dbPoolInstance) => {

    console.log("in listings models")
    
    const getListings = (query, callback) => {
        let text = `SELECT * FROM listings WHERE lower(listing_name) LIKE lower('%${query}%')`;
        dbPoolInstance.query(text, (err, result) => {
            if (err) {
                console.log('error at models listing.js, getListings ---', err.message);
                callback(null, null)
            }
            else {
                callback(null, result);
            }
        })
    }

    const getShopListings = (shopID, callback) => {
        let query = `SELECT listings.id, listings.listing_name, listings.image_url, listings.listing_details FROM shops INNER JOIN listings ON shops.id = listings.shop_id WHERE shops.id = ${shopID}`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log('error at listings models, getShopListings ---', err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }

    return {
        getListings,
        getShopListings
    }
}