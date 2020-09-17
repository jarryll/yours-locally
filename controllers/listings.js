module.exports = (db) => {

    const listings = (req, res) => {
        let query = req.params.query;
        console.log(query);
        console.log('controller triggered');
        db.listings.getListings(query, (err, result) => {
            if (err) {
                console.log('error at controllers listings.js, listings ---', err.message);
            }
            else {
                console.log(result);
                res.send(result.rows)
            }
        })
    }

    const shopListings = (req, res) => {
        console.log("shopListings controller triggered")
        let shopID = req.params.id;
        db.listings.getShopListings(shopID, (err, result) => {
            if (err) {
                console.log('error at listings controller, shopListings ---', err.message);
            }
            else {
                res.send(result.rows);
            }
        })
    }

    return {
        listings,
        shopListings
    }
}