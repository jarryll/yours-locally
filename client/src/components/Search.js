import React from 'react';
import '../App.css'

function Search(props) {
    let { onChangeHandler, inputHandler, input } = props
    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        inputHandler(event)
      }
    }
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
                onKeyPress={(event)=>{
                        handleKeyPress(event)
                    }}
                />
                <button
                class="search_icon"
                onClick={(e) => {
                    e.persist()
                    e.preventDefault()
                    inputHandler(e)
                }}
                ><i class="fas fa-search"></i></button>
        </div>
      </div>
    </div>
    )
}
export default Search