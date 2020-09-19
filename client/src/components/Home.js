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
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
  <div class="col-md-5 p-lg-5 mx-auto my-5">
    <h1 class="display-4 font-weight-light">Yours Locally.</h1>
    <p class="lead font-weight-lighter">Hover over the search icon to begin a search</p>
    <Search
                onChangeHandler={onChangeHandler}
                inputHandler={inputHandler}
                input={input}
            />
                <br /><br />
            {loggedIn && !hasSearched ? <SellerShops sellerId={sellerId} /> : null}
            <br /><br />
            {!hasSearched ? <AllShops /> : null}
            <br /><br />
            {hasSearched ? <Results query={query} /> : null}
  </div>

</div>
    )
}
export default Home