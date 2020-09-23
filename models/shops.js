module.exports = (dbPoolInstance) => {

    let findShop = async (value) => {
        console.log(value, "models triggered")
        let query = 'SELECT * FROM shops WHERE id=$1;'
        const result = await dbPoolInstance.query(query, value)
        return (result)
    }

    let getEditShop = async (shopName, about, imageUrl, id, callback) => {
        about = about.replace(/[\"\'\`]/g, "");
        let values = [shopName, about, imageUrl, id]
        let query = `UPDATE shops SET shop_name=$1, image_url=$3, about=$2 WHERE id=$4`
        dbPoolInstance.query(query, values, (err, result) => {
            callback(err, result)
        })
    }

    let getDeleteShop = async (id, callback) => {
        let query = `DELETE FROM shops WHERE id='${id}'; DELETE FROM listings WHERE listings.shop_id = '${id}'`
        dbPoolInstance.query(query, (err, result) => {
            callback(err, result)
        })
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
        let query = `SELECT shops.id, shops.shop_name, shops.image_url, shops.about, round(avg(reviews.rating),1) AS average_rating from shops left join reviews on reviews.shop_id = shops.id GROUP BY shops.id, shops.shop_name, shops.image_url, shops.about;`;
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log("error at shops model, getAllShops ---", err.message);
                callback(null, null);
            }
            else {
                callback(null, result.rows);
            }
        })
    }

    let getCreateShop = (id, selectedCategories, shop_name, image_url, about, callback) => {
        about = about.replace(/[\"\'\`]/g, "");
        console.log(selectedCategories)
        selectedCategories = parseInt(selectedCategories)
        id = parseInt(id)
        console.log(selectedCategories, id)
        let query = `INSERT INTO shops (shop_name,image_url,about,category_id,seller_id) VALUES($$${shop_name}$$,'${image_url}','${about}',${selectedCategories},${id})`
        dbPoolInstance.query(query, (err, result) => {
            callback(err, result)
        })
    }


    return {
        findShop,
        getSellerShops,
        getAllShops,
        getEditShop,
        getDeleteShop,
        getCreateShop
    }
}

