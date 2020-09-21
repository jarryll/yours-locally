module.exports = (db) => {

    let reviews = (req, res) => {

        let id = req.params.id;

        db.reviews.getReviews(id, (err, result) => {
            if (err) {
                console.log("error at reviews controller, reviews ---", err.message);
            }
            else {
                res.send(result.rows);
            }
        })
    }

    let newReview = (req, res) => {

        console.log("newReview controller triggered")

        const { review, rating, userId, shopId } = req.body;
        console.log(req.body)
        db.reviews.getNewReview(review, rating, userId, shopId, (err, result) => {
            if (err) {
                console.log("error at reviews controller, newReview ---", err.message);
            }
            else {
                res.send(result.rows)
            }
        })

    }

    let editReview = (req,res) => {
        const {review,rating, itemId} = req.body;
        let values = [review,rating,itemId]
        console.log(values)
        db.reviews.getEditReview(values,(err, result) => {
            if (err) {
                console.log("error at reviews controller, newReview ---", err.message);
            }
            else {
                res.send(result.rows)
            }
        })
    }

    let deleteReview = (req,res) => {
        let {id} = req.params;
            db.reviews.getDeleteReview(id,(err,result)=>{
            if (err) {
                console.log('error at revoews controller, deleteReview ---', err.message);
            }
            else {
                res.send("Review Deleted!");
            }
    })
    }

    let avgRating = (req, res) => {

        console.log("avgRating controller triggered");

        let shopId = req.params.id;

        db.reviews.getAvgRating(shopId, (err, result) => {
            if (err) {
                console.log("error at reviews controller, avgRating ---", err.message);
            }
            else {
                res.send(result.rows);
            }
        })
    }




    return {
        reviews,
        newReview,
        avgRating,
        editReview,
        deleteReview,
    }
}