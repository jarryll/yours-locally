module.exports = (dbPoolInstance) => {

    let getReviews = (id, callback) => {

        let query = `SELECT users.username, reviews.review, reviews.rating, reviews.created_at FROM ((shops INNER JOIN reviews ON shops.id = reviews.shop_id) INNER JOIN users ON users.id = reviews.user_id) WHERE shops.id = ${id}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log("error at reviews model, getReviews ---", err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }

    return {
        getReviews
    }
}