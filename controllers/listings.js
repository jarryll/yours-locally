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

   const createListing = (request,response) => {
    let {id, categoryId, listing_name,listing_details,image_url} = request.body;
    db.listings.getCreateListing(id, categoryId, listing_name,listing_details,image_url,(err,result)=>{
            if (err) {
                console.log('error at listings controller, shopListings ---', err.message);
            }
            else {
                response.send("Listing Created!");
            }
    })
   }


    return {
        listings,
        shopListings,
        createListing
    }
}