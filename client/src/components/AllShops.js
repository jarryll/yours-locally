import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AllShops() {

    const [allShops, setAllShops] = useState([]);

    useEffect(() => {
        getAllShops();
    }, [])

    const getAllShops = async () => {
        const results = await fetch("/allshops");
        const allShops = await results.json();
        setAllShops(allShops);
    }

    let shops = allShops.map((item, index) => {
        return (
            <Link to={`/shop/${item.id}`} className="shop" key={index}>
                <div>
                    <div><img src={item.image_url} alt={item.shop_name} /></div>
                    <div>{item.shop_name}</div>
                </div>
            </Link>
        )
    })

    return (

        <div>
            All Shops
            <div className="shops">{shops}</div>
        </div>

    )
}

export default AllShops
