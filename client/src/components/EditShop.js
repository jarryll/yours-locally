import React, { useState, useEffect } from "react";
import DeleteShop from './DeleteShop'

const EditShop =  ({ shop }) => {
  const [shopName, setShopName] =  useState(shop.shop_name);
  const [about, setAbout] =  useState(shop.about);
  const [imageUrl, setimageUrl] =  useState(shop.image_url);
  //edit description function



  const setFunction = () => {
        setShopName(shop.shop_name)
        setAbout(shop.about)
        setimageUrl(shop.image_url)
  }



console.log(shopName,about)

  const updateShop = async e => {
    e.preventDefault();
    try {
      const body = { shopName,about,imageUrl };
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
        class="btn btn-warning"
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
        class="modal"
        id={`id${shop.id}`}
        onClick={() => setFunction()}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Shop</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setFunction()}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
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

            <div class="modal-footer">
                <DeleteShop id={shop.id}/>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={e => updateShop(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-warning"
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