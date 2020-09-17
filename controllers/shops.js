module.exports = (db) => {

    let getShop = async (req, res) => {
        console.log("controllers triggered")
        const value = [req.params.id];
        const result = await db.shops.findShop(value)
        res.send(result.rows)
    }

    let sellerShops = (req, res) => {

        console.log("sellerShops controller triggered");

        const sellerID = req.params.sellerID;

        db.shops.getSellerShops(sellerID, (err, result) => {
            if (err) {
                console.log("error at shops controller, sellerShops ---", err.message);
            }
            else {
                res.send(result.rows);
            }
        })

    }

    return {
        getShop,
        sellerShops
    }
}