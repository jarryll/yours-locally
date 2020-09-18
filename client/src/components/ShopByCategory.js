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
            <div key={index} id={item.id} onClick={onClickHandler}>
                {item.category_name}
            </div>
        )
    })

    return (
        <div>
            <h1>You are at SHOP BY CATEGORY</h1>
            {allCategories}
            {hasSelected ? <CategoryShops categoryId={categoryId} /> : null}
        </div>
    )
}

export default ShopByCategory