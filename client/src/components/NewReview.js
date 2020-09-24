import React, { useState } from 'react';

function NewReview(props) {

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);

    const onChangeHandler = (e) => {
        setReview(e.target.value);
    }

    const ratingHandler = (e) => {
        setRating(e.target.value);
    }

    const onClickHandler = async (e) => {

        e.preventDefault();

        let { userId, shop } = props;
        console.log(userId)
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
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${props.shop.id}createreview`}
      >
        Add Review
      </button>

      <div
        class="modal"
        id={`id${props.shop.id}createreview`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">New Review</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
                Review:
              <textarea
                type="text"
                className="form-control"
                rows='4'
                value={review}
                required
                minLength="5"
                maxLength="300"
                onChange={e => onChangeHandler(e)}
              ></textarea>
                Rating (1-5):
              <input
                type="number"
                className="form-control"
                value={rating}
                min="1"
                max="5"
                required
                onKeyDown={(event) => {
                  event.preventDefault();
                }}
                onChange={e => ratingHandler(e)}
                rows='4'
                />

            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={e => onClickHandler(e)}
              >
                Add
              </button>
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default NewReview
