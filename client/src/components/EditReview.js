import React, { useState,useEffect } from 'react';
import DeleteReview from './DeleteReview';


function EditReview({item,shop}) {

    const [review, setReview] = useState(item.review);
    const [rating, setRating] = useState(item.rating);



    const onChangeHandler = (e) => {
        setReview(e.target.value);
    }

    const ratingHandler = (e) => {
        setRating(e.target.value);
    }

    const onClickHandler = async (e) => {

        e.preventDefault();

        let shopId = shop.id;
        let itemId = item.id;
        const body = { review, rating, itemId };

        const results = await fetch("/review/edit", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        window.location = `/shop/${shop.id}`;

    }


    return (
       <div>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${item.id}`}
      >
        Edit Review
      </button>

      <div
        class="modal"
        id={`id${item.id}`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Review</h4>
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
                onChange={e => ratingHandler(e)}
                rows='4'
                />

            </div>

            <div class="modal-footer">
            <DeleteReview item={item} shop={shop} />
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={e => onClickHandler(e)}
              >
                Edit
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

export default EditReview
