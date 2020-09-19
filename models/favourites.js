module.exports = (dbPoolInstance) => {

    const getSellerFavourites = async (queryValues) => {
        const query = 'SELECT * FROM shops INNER JOIN favourites ON shops.id = favourites.shop_id INNER JOIN sellers ON favourites.id = sellers.favourites WHERE sellers.id = $1;'
        const result = await dbPoolInstance.query(query, queryValues)
        return result
    }

    const getUserFavourites = async (queryValues) => {
        const query = 'SELECT * FROM shops INNER JOIN favourites ON shops.id = favourites.shop_id INNER JOIN users ON favourites.id = users.favourites WHERE users.id = $1;'
        const result = await dbPoolInstance.query(query, queryValues)
        return result
    }

    return {
      getSellerFavourites,
      getUserFavourites
    }
}