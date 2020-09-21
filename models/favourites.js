module.exports = (dbPoolInstance) => {

    const getSellerFavourites = async (queryValues) => {
        const query = 'SELECT * FROM shops INNER JOIN favourites ON shops.id = favourites.shop_id where favourites.seller_id = $1;'
        // const query = 'SELECT * FROM shops INNER JOIN favourites ON shops.id = favourites.shop_id INNER JOIN sellers ON favourites.id = sellers.favourites WHERE sellers.id = $1;'
        const result = await dbPoolInstance.query(query, queryValues)
        return result
    }

    const getUserFavourites = async (queryValues) => {
        const query = 'SELECT * FROM shops INNER JOIN favourites ON shops.id = favourites.shop_id where favourites.user_id = $1;'
        const result = await dbPoolInstance.query(query, queryValues)
        console.log(result)
        return result
    }

    const postUserFavourites = async (queryValues) => {
        const { userId, shopId } = queryValues
        const queryValues1 = [shopId, userId];
        // Insert favourites into favourites table and return the id so we can put into users table
        const query1 = 'INSERT INTO favourites (shop_id, user_id) VALUES ($1, $2);'
        const result1 = await dbPoolInstance.query(query1, queryValues1);

        // Add count to shops table
        const queryValues2 = [shopId]
        const query2 = 'UPDATE shops SET favourites_count = favourites_count+1 WHERE id = $1;'
        const result2 = await dbPoolInstance.query(query2, queryValues2);
        return result2;
    }

    const postSellerFavourites = async (queryValues) => {
        const { sellerId, shopId } = queryValues
        const queryValues1 = [sellerId, shopId];
        // Insert favourites into favourites table and return the id so we can put into users table
        const query1 = 'INSERT INTO favourites (shop_id, seller_id) VALUES ($2, $1);'
        const result1 = await dbPoolInstance.query(query1, queryValues1);

        // Add count to shops table
        const queryValues2 = [shopId]
        const query2 = 'UPDATE shops SET favourites_count = favourites_count+1 WHERE id = $1;'
        const result2 = await dbPoolInstance.query(query2, queryValues2);

        return result2;
    }

    const removeUserFavourites = async (queryValues) => {
        const { userId, shopId } = queryValues;
        const queryValues1 = [userId, shopId]
        const query1 = 'DELETE FROM favourites WHERE user_id = $1 AND shop_id=$2;'
        const result1 = await dbPoolInstance.query(query1, queryValues1);

        const queryValues2 = [shopId]
        const query2 = 'UPDATE shops SET favourites_count = favourites_count-1 WHERE id = $1;'
        const result2 = await dbPoolInstance.query(query2, queryValues2);

        return result2;    
    }

    const removeSellerFavourites = async (queryValues) => {
        const { sellerId, shopId } = queryValues;
        const queryValues1 = [sellerId, shopId]
        const query1 = 'DELETE FROM favourites WHERE seller_id = $1 AND shop_id=$2;'
        const result1 = await dbPoolInstance.query(query1, queryValues1);

        const queryValues2 = [shopId]
        const query2 = 'UPDATE shops SET favourites_count = favourites_count-1 WHERE id = $1;'
        const result2 = await dbPoolInstance.query(query2, queryValues2);

        return result2;    
    }

    const getUserFavouritesStatus = async (queryValues) => {
        const query = 'SELECT * FROM favourites WHERE user_id = $1 AND shop_id = $2;' 
        const result = await dbPoolInstance.query(query, queryValues)
        return result
    }

    const getSellerFavouritesStatus = async (queryValues) => {
        const query = 'SELECT * FROM favourites WHERE seller_id = $1 AND shop_id = $2;' 
        const result = await dbPoolInstance.query(query, queryValues)
        return result
    }

    return {
      getSellerFavourites,
      getUserFavourites,
      postUserFavourites,
      postSellerFavourites,
      removeUserFavourites,
      removeSellerFavourites,
      getUserFavouritesStatus,
      getSellerFavouritesStatus
    }
}