import React, { useEffect, useState } from 'react';

import CategoryShops from "./CategoryShops"

function ShopByCategory() {

    const [categories, setCategories] = useState([]);
    const [hasSelected, setHasSelected] = useState(false);
    const [categoryId, setCategoryId] = useState();

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        const results = await fetch("/categories");
        const categories = await results.json();
        setCategories(categories);
    }

    let onClickHandler = (e) => {
        setHasSelected(true);
        setCategoryId(e.target.id);
        console.log(e.target.id);
        console.log("onClickHandler triggered")
    }

    let allCategories = categories.map((item, index) => {

        return (
            <button type="button" key={index} id={item.id} onClick={onClickHandler} class="btn btn-secondary text-capitalize">
                {item.category_name}
            </button>
        )
    })

    let categoriesDropdown = categories.map((item,index)=>{
        return(
            <div key={index} id={item.id} onClick={onClickHandler} class="dropdown-item text-capitalize">
                {item.category_name}
            </div>
            )
    })


    return (
        <div>
            <h2 class="font-weight-light text-center mt-4" >You may also search by categories</h2>
            <p class="lead font-weight-lighter text-center">We understand the search bar is not for everyone... </p>
            <div class="btn-group d-flex justify-content-center" role="group" aria-label="Button group with nested dropdown" style={{width:'600px', margin:'0 auto'}}>
            {allCategories}
              <div class="btn-group" role="group" style={{cursor:'pointer'}}>
                <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categories
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    {categoriesDropdown}
                </div>
              </div>
            </div>
            {hasSelected ? <CategoryShops categoryId={categoryId} /> : null}
        </div>
    )
}

export default ShopByCategory