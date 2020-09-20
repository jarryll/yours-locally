module.exports = (dbPoolInstance) => {

    let getAll = async () => {
        console.log(" categories models triggered")
        let query = 'SELECT * FROM categories;'
        try {
            const result = await dbPoolInstance.query(query)
            return (result)
        } catch (err) {
            console.log(err.stack)
            throw new Error("Failed to fetch all categories")
        }
    }

    let getCategoryShops = (categoryId, callback) => {

        let query = `SELECT shops.id, shops.shop_name, shops.image_url,categories.category_name FROM categories INNER JOIN shops ON categories.id = shops.category_id WHERE categories.id = ${categoryId}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log("error at categories model, getCategoryShops ---", err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }

    return {
        getAll,
        getCategoryShops
    }
}