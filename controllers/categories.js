module.exports = (db) => {

    let getAllCategories = async (req, res) => {
        console.log("categories controllers triggered")
        const result = await db.categories.getAll()
        res.send(result.rows)
    }

    let categoryShops = (req, res) => {

        let categoryId = req.params.id;

        db.categories.getCategoryShops(categoryId, (err, result) => {
            if (err) {
                console.log("error at categories controller, categoryShops ---", err.message);
            }
            else {
                res.send(result.rows);
            }
        })
    }

    return {
        getAllCategories,
        categoryShops
    }
}