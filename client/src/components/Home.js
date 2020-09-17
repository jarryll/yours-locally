import React, { useState } from 'react';
import Search from "./Search";
import Results from "./Results";

function Home() {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
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
            {hasSearched ? <Results query={query} /> : null}
        </div>
    )
}
export default Home