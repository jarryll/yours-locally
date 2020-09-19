import React from 'react';
import '../App.css'

function Search(props) {
    let { onChangeHandler, inputHandler, input } = props
    return (
    <div class="container h-100">
      <div class="d-flex justify-content-center h-100">
        <div class="searchbar">
                <input
                class="search_input"
                type="text"
                placeholder="Search..."
                name="searchInput"
                value={input}
                onChange={(e) => {onChangeHandler(e)}}
                />
                <button
                class="search_icon"
                onClick={(e) => {
                    e.persist()
                    e.preventDefault()
                    inputHandler(e)
                }}><i class="fas fa-search"></i></button>
        </div>
      </div>
    </div>
    )
}
export default Search