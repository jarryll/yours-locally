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

    const addUserFavourites = async (req, res) => {
        try {
            const response = await db.favourites.postUserFavourites(req.body);
            res.send(response)
        } catch (err) {
            console.log(err.stack);
        }  
    }

    const addSellerFavourites = async (req, res) => {
        try {
            const response = await db.favourites.postSellerFavourites(req.body);
            res.send("got your request")
        } catch (err) {
            console.log(err.stack);
        }  
    }

    const deleteUserFavourites = async (req, res) => {
        try {
            const response = await db.favourites.removeUserFavourites(req.body);
            res.send("successfully unfavourited for user") 
        } catch (err) {
            console.log(err.stack);
        }
    }

    const deleteSellerFavourites = async (req, res) => {
        try {
            const response = await db.favourites.removeSellerFavourites(req.body);
            res.send("successfully unfavourited for seller") 
        } catch (err) {
            console.log(err.stack);
        }      
    }

    const fetchSellerFavouritesStatus = async (req, res) => {
        const { id, shop } = req.query
        const queryValues = [id, shop];
        try {
            const response = await db.favourites.getSellerFavouritesStatus(queryValues);
            console.log(response)
            res.send(response)
         } catch (err) {
             throw new Error(err.stack, 'failed to get user favourite status')
         }
    }

    const fetchUserFavouritesStatus = async (req, res) => {
        const { id, shop } = req.query
        const queryValues = [id, shop];
        try {
            const response = await db.favourites.getUserFavouritesStatus(queryValues);
            console.log(response)
            res.send(response)
         } catch (err) {
             throw new Error(err.stack, 'failed to get user favourite status')
         }
    }
       

    return {
        sellerFavourites,
        userFavourites,
        addUserFavourites,
        addSellerFavourites,
        deleteSellerFavourites,
        deleteUserFavourites,
        fetchUserFavouritesStatus,
        fetchSellerFavouritesStatus
    }
}


