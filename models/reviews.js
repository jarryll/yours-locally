module.exports = (dbPoolInstance) => {

    let getReviews = (id, callback) => {

        let query = `SELECT users.username, reviews.review, reviews.rating, reviews.created_at FROM ((shops INNER JOIN reviews ON shops.id = reviews.shop_id) INNER JOIN users ON users.id = reviews.user_id) WHERE shops.id = ${id} ORDER BY created_at DESC`;

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

    let getNewReview = (review, rating, userId, shopId, callback) => {

        let query = `INSERT INTO reviews (review, rating, shop_id, user_id) VALUES ($$${review}$$, ${rating}, ${shopId}, ${userId})`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log("error at reviews model, getNewReview ----", err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }

    let getAvgRating = (shopId, callback) => {

        let query = `SELECT COUNT(*), ROUND(AVG(rating), 1) FROM reviews WHERE shop_id  = ${shopId}`;

        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log("error at reviews model, getAvgRating ---", err.message);
                callback(null, null);
            }
            else {
                callback(null, result);
            }
        })
    }

    return {
        getReviews,
        getNewReview,
        getAvgRating
    }
}