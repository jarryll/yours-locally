import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryShops(props) {

    const [allShops, setAllShops] = useState([]);
    const [currentCat, setCurrentCat] = useState('');
    let { categoryId } = props

    const getAllShops = async () => {

        const results = await fetch(`/category/${categoryId}`)
        const shops = await results.json();
        if (shops.length > 0) { setCurrentCat(shops[0].category_name) } if (shops.length === 0) {
            setCurrentCat('Sorry no listings for this category!')
        }

        setAllShops(shops);
    }

    useEffect(() => {
        getAllShops();
    }, [categoryId]);

    let shops = allShops.map((item, index) => {
        return (
            <div class="card mb-4 col-3 mr-5 ml-5 d-inline-flex align-items-center" style={{ display: 'inline-block', maxHeight: '600px' }}>
                <div style={{ height: '400px' }} class="d-flex"><img class="card-img-top" src={item.image_url} alt="shop cover" style={{ objectFit: 'fill', margin: 'auto 0', alignSelf: 'center', maxHeight: '300px' }} /></div>
                <div class="card-body mx-auto text-center">
                    <h5 class="card-title">{item.shop_name}</h5>
                    <p class="card-text"><small class="text-muted">{item.listing_details}</small></p>
                    <Link to={`/shop/${item.id}`} key={index} className="btn btn-primary ">Visit Me</Link>
                </div>
            </div>
        )
    })


    return (
        <div>
            <h2 class="font-weight-light text-center mt-4 text-capitalize" >{currentCat}</h2>
            <div class="row  d-flex justify-content-center">
                {shops}
            </div>
        </div>
    )
}

export default CategoryShops
