import React, { useState } from 'react';

const ItemFilter = (props) => {
  const [filterInput, setFilterInput] = useState('')
  
  function inputChangeHandler(e) {
    setFilterInput(e.target.value);
  }
  props.onGetSearchValue(filterInput)

  return (
    <div>
      <label htmlFor='search'>Buscar </label>
      <input type="text" id='search' onChange={inputChangeHandler}/>
    </div>
  )
}

export default ItemFilter