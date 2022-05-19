import React, { useState } from 'react'

const FilterFavoritesByName = (props) => {
    const [filterInput, setFilterInput] = useState('');

    function inputChangeHandler(e) {
        setFilterInput(e.target.value);
    }
    
    function submitHandler(e) {
        e.preventDefault();
        props.onGetSearchValue(filterInput);
    }

  return (
    <form onSubmit={submitHandler}>
        <button type='submit'>Search</button>
        <input type="text" id='search' placeholder='type a name here' onChange={inputChangeHandler}/>
        <br />
  </form>
  )
}

export default FilterFavoritesByName