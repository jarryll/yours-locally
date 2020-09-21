import React from 'react';
import '../App.css'

function Search(props) {
  let { onChangeHandler, inputHandler, input } = props
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      inputHandler(event)
    }
  }
  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="searchbar">
          <input
            className="search_input"
            type="text"
            placeholder="Search..."
            name="searchInput"
            value={input}
            onChange={(e) => { onChangeHandler(e) }}
            onKeyPress={(event) => {
              handleKeyPress(event)
            }}
          />
          <button
            className="search_icon"
            onClick={(e) => {
              e.persist()
              e.preventDefault()
              inputHandler(e)
            }}
          ><i className="fas fa-search"></i></button>
        </div>
      </div>
    </div>
  )
}
export default Search