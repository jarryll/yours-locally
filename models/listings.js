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
        let query = `SELECT listings.id, listings.listing_name, listings.image_url, listings.listing_details, listings.quantity, listings.price FROM shops INNER JOIN listings ON shops.id = listings.shop_id WHERE shops.id = ${shopID}`;
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

    const getCreateListing = (id, categoryId, listing_name,listing_details,image_url,quantity,price,callback) => {
        let values = [id, categoryId, listing_name,listing_details,image_url,quantity,price]
        let query= `INSERT INTO listings (listing_name, listing_details, image_url, quantity, price, shop_id, category_id) VALUES($3,$4,$5,$6,$7,$1,$2)`

        dbPoolInstance.query(query, values,(err, result) => {
            if (err) {
                console.log('error at listings models, getCreateListing ---', err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
}

const getEditListing = (values,callback) => {
        let query= `UPDATE listings SET listing_name=$1, listing_details=$2, image_url=$3, quantity=$5,price=$6 WHERE id=$4`

        dbPoolInstance.query(query, values,(err, result) => {
            if (err) {
                console.log('error at listings models, getEditListing ---', err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
}

const getDeleteListing = (id,callback) => {
        let query= `DELETE FROM listings WHERE id=${id}`
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log('error at listings models, getDeleteListing ---', err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
}

    return {
        getListings,
        getShopListings,
        getCreateListing,
        getEditListing,
        getDeleteListing
    }
}
