import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Search from "./Search";
import SellerShops from "./SellerShops";
import AllShops from "./AllShops";
import Results from "./Results";

function Home() {

    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [sellerId, setSellerId] = useState();

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const checkLoggedIn = () => {
        if (Cookies.get('random')) {
            setLoggedIn(true);
            setSellerId(Cookies.get('random'));
            console.log('hello');
        }
    }

    let onChangeHandler = (e) => {
        setInput(e.target.value);
    }
    let inputHandler = (e) => {
        setQuery(input);
        setHasSearched(true);
        setInput("");
    }

    return (
        <div>
    <h1 class="display-4 font-weight-light text-center mt-4" >Yours Locally.</h1>
    <p class="lead font-weight-lighter text-center">Hover over the search icon to begin a search</p>
    <Search
                onChangeHandler={onChangeHandler}
                inputHandler={inputHandler}
                input={input}
            />
                <br />
            {loggedIn && !hasSearched ? <SellerShops sellerId={sellerId} /> : null}
            <br /><div style={{borderBottom: '0.5px solid #CBCBCB'}}></div>
            {!hasSearched ? <AllShops /> : null}
            <br /><br />
            {hasSearched ? <Results query={query} /> : null}
</div>
    )
}
export default Home