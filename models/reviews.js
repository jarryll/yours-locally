module.exports = (dbPoolInstance) => {

    let getReviews = (id, callback) => {

        let query = `SELECT users.username, reviews.review,reviews.user_id AS reviewUserId, reviews.rating,
        reviews.id, reviews.created_at FROM ((shops INNER JOIN reviews ON shops.id = reviews.shop_id) INNER JOIN users ON users.id = reviews.user_id) WHERE shops.id = ${id} ORDER BY created_at DESC`;

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

    let getEditReview = (values,callback) => {
        let query = `UPDATE reviews SET review=$1, rating=$2 WHERE id=$3`;
            dbPoolInstance.query(query, values, (err, result) => {
                if (err) {
                    console.log("error at reviews model, getEditReview ----", err.message);
                    callback(null, null);
                }
                else {
                    callback(null, result);
                }
            })
    }

const getDeleteReview = (id,callback) => {
        let query= `DELETE FROM reviews WHERE id=${id}`
        dbPoolInstance.query(query, (err, result) => {
            if (err) {
                console.log('error at reviews models, getDeleteReview ---', err.message);
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
        getAvgRating,
        getEditReview,
        getDeleteReview,
    }
}