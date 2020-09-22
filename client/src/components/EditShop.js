import React, { useState } from "react";
import DeleteShop from './DeleteShop'

const EditShop = ({ shop }) => {
  const [shopName, setShopName] = useState(shop.shop_name);
  const [about, setAbout] = useState(shop.about);
  const [imageUrl, setimageUrl] = useState(shop.image_url);

  const setFunction = () => {
    setShopName(shop.shop_name)
    setAbout(shop.about)
    setimageUrl(shop.image_url)
  }

  const updateShop = async e => {
    e.preventDefault();
    try {
      const body = { shopName, about, imageUrl };
      const response = await fetch(
        `/shops/${shop.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = `/shop/${shop.id}`;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${shop.id}`}
        onClick={() => setFunction()}
      >
        Edit
      </button>

      {/*
        id = id10
      */}
      <div
        className="modal"
        id={`id${shop.id}`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Shop</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              Shop Name:
              <input
                type="text"
                className="form-control"
                value={shopName}
                onChange={e => setShopName(e.target.value)}
              />
                About:
              <textarea
                type="text"
                className="form-control"
                value={about}
                onChange={e => setAbout(e.target.value)}
                rows='6'
              >

              </textarea>
              Image:
              <input
                type="text"
                className="form-control"
                value={imageUrl}
                onChange={e => setimageUrl(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <DeleteShop id={shop.id} />
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={e => updateShop(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => setFunction()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditShop;