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

    return {
        reviews
    }
}