module.exports = (db) => {

    let getShop = async (req, res) => {
        console.log("controllers triggered")
        const value = [req.params.id];
        const result = await db.shops.findShop(value)
        res.send(result.rows)
    }

    let editShop = async (request, response) => {
        let { id } = request.params
        let { shopName, about, imageUrl } = request.body;
        db.shops.getEditShop(shopName, about, imageUrl, id, (err, result) => {
            if (err) {
                console.log(err)
                response.status(500).send("Oops we did not find the shop you were looking for")
            } else {
                response.send("updated!")
            }
        })
    }

    let deleteShop = async (request, response) => {
        let { id } = request.params;
        db.shops.getDeleteShop(id, (err, result) => {
            if (err) {
                console.log(err)
                response.status(500).send("Oops we did not find the shop you were looking for")
            } else {
                response.send("deleted!")
            }
        })
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

    let allShops = (req, res) => {
        console.log("allShops controller triggered");
        db.shops.getAllShops((err, result) => {
            if (err) {
                console.log("error at shops controller, allShops ===", err.message);
            }
            else {
                res.send(result);
            }
        })
    }

    let createShop = (request, response) => {
        let { id, selectedCategories, shop_name, image_url, about } = request.body;
        console.log(request.body)
        db.shops.getCreateShop(id, selectedCategories, shop_name, image_url, about, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                response.send("shop created!")
            }
        })
    }


    return {
        getShop,
        sellerShops,
        allShops,
        editShop,
        deleteShop,
        createShop
    }
}
