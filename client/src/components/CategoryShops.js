import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryShops(props) {

    const [allShops, setAllShops] = useState([]);

    let { categoryId } = props

    useEffect(() => {
        getAllShops();
    }, [categoryId]);

    const getAllShops = async () => {

        const results = await fetch(`/category/${categoryId}`)
        const shops = await results.json();
        console.log(shops);
        setAllShops(shops);
    }

    let shops = allShops.map((item, index) => {
        return (
            <Link to={`/shop/${item.id}`} key={index}>
                <div>
                    <div><img src={item.image_url} alt={item.shop_name} /></div>
                    <div>{item.shop_name}</div>
                </div>
            </Link>
        )
    })

    return (
        <div>
            {shops}
        </div>
    )
}

export default CategoryShops
