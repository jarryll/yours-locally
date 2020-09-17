module.exports = (dbPoolInstance) => {

    let findShop = async (value) => {
        console.log(value, "models triggered")
        let query = 'SELECT * FROM shops WHERE id=$1;'
        const result = await dbPoolInstance.query(query, value)
        return (result)
    }

    let getSellerShops = (sellerID, callback) => {

        let query = `SELECT shops.id, shops.shop_name, shops.image_url FROM sellers INNER JOIN shops ON sellers.id = shops.seller_id WHERE sellers.id = ${sellerID}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log("error at shops model, getSellerShops ---", err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }

    let getAllShops = (callback) => {

        let query = "SELECT * FROM shops";

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log("error at shops model, getAllShops ---", err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }

    return {
        findShop,
        getSellerShops,
        getAllShops
    }
}