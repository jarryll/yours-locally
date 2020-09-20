import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function CreateShop({id}){

    const [categories, setCategories] = useState([]);
    const [shop_name, setShop_name] = useState("")
    const [image_url, setImage_url] = useState("")
    const [about, setAbout] = useState("")
    const [selectedCategories, setSelectedCategories] = useState("");

    useEffect(()=>{
        fetchCategories()
    },[])

    const fetchCategories = async () => {
                let response = await fetch('/categories')
                response = await response.json();
                console.log(response)
                setCategories(response)
          }


    const handleShopNameChange = (e) => {
        setShop_name(e.target.value)
        }
    const handleImageURLChange = (e) => {
        setImage_url(e.target.value)
        }
    const handleAboutChange = (e) => {
        setAbout(e.target.value)
        }
    const handleCategoriesChange = (e) => {
        setSelectedCategories(e.target.value)
        }

     const handleClick = async (e) => {
        e.preventDefault();
     try{
        const body = {id, selectedCategories,shop_name,image_url,about}
        const response = await fetch("/shops/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
        console.log(response)
        window.location = '/'
     } catch (err) {
        throw new Error ("ERRORRRR")
     }
    }


    const categoriesOpts = categories.map((category,index)=>{
    return(
        <option key={index} value={index+1}>{category.category_name}</option>
        )
        })

        return(
                <div>
                    <div>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${id}`}
        onClick={()=>{
            setShop_name('')
            setImage_url('')
            setAbout('')
            setSelectedCategories('')
        }}
      >
        Add New Shop
      </button>
      <div
        class="modal"
        id={`id${id}`}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Shop</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
                Shop Name:
              <input
                type="text"
                className="form-control"
                value={shop_name}
                onChange={e => handleShopNameChange(e)}
              />
                About:
              <textarea
                type="text"
                className="form-control"
                value={about}
                onChange={e => handleAboutChange(e)}
                rows='6'
                >

              </textarea>
              Image:
              <input
                type="text"
                className="form-control"
                value={image_url}
                onChange={e => handleImageURLChange(e)}
              />
              Category:
              <select class="form-control"
              onChange={(e)=> handleCategoriesChange(e)}
              >
              <option value="">Please Choose</option>
              {categoriesOpts}
              </select>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={e => handleClick(e)}
              >
                Create
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
                </div>
                )
                }


export default CreateShop