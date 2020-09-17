import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import Search from "./Search";
import SellerShops from "./SellerShops";
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
            <h1>You are HOME</h1>

            <Search
                onChangeHandler={onChangeHandler}
                inputHandler={inputHandler}
                input={input}
            />

            {loggedIn ? <SellerShops sellerId={sellerId} /> : null}

            {hasSearched ? <Results query={query} /> : null}
        </div>
    )
}
export default Home