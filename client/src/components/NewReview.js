import React, { useState } from 'react';

function NewReview(props) {

    const [review, setReview] = useState("");
    const [rating, setRating] = useState();

    const onChangeHandler = (e) => {
        setReview(e.target.value);
    }

    const ratingHandler = (e) => {
        setRating(e.target.value);
    }

    const onClickHandler = async (e) => {

        e.preventDefault();

        let { userId, shop } = props;
        let shopId = shop.id;
        const body = { review, rating, userId, shopId };

        const results = await fetch("/review/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        console.log(results);

        window.location = `/shop/${props.shop.id}`;
    }

    return (
        <div>
            <form onSubmit={(e) => onClickHandler(e)}>
                <label htmlFor="review">Review:</label>
                <input type="TEXT" required minLength="5" maxLength="300" id="review"
                    onChange={onChangeHandler}
                />
                <br />
                <label htmlFor="rating">Rating (1-5):</label>
                <input type="NUMBER" id="quantity" name="rating" min="1" max="5" required
                    onChange={ratingHandler}
                />
                <br />
                <input type="submit" class="btnSubmit" value="Submit" />
            </form>
        </div>
    )
}

export default NewReview
