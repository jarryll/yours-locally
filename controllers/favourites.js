module.exports = (db) => {

    const sellerFavourites = async (req, res) => {
        const queryValues = [req.params.id];
        try {
            const response = await db.favourites.getSellerFavourites(queryValues)
            res.send(response)
        } catch (err) {
            console.log(err.stack);
        }
    }

    const userFavourites = async (req, res) => {
        const queryValues = [req.params.id];
        try {
            const response = await db.favourites.getUserFavourites(queryValues)
            res.send(response.rows)
        } catch (err) {
            console.log(err.stack);
        }
    }

    return {
        sellerFavourites,
        userFavourites
    }
}