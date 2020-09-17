import React from 'react';

function Search(props) {
    let { onChangeHandler, inputHandler, input } = props
    return (
        <div>
            <form>
                <input type="text"
                    name="searchInput"
                    value={input}
                    onChange={(e) => {
                        onChangeHandler(e)
                    }}
                />
                <button onClick={(e) => {
                    e.persist()
                    e.preventDefault()
                    inputHandler(e)
                }}>Search</button>
            </form>
        </div>
    )
}
export default Search