import React, { useState } from 'react';

const ItemFilter = (props) => {
  const [filterInput, setFilterInput] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  
  function inputChangeHandler(e) {
    setFilterInput(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    props.onGetSearchValue(filterInput);
  }

  function filterFavoritesHandler() {
    setShowFavorites(true);
    props.onFilterFavorites();
    props.onFilterByName();
  }

  function showAllHandler() {
    setShowFavorites(false);
    props.onShowAll();
  }
  
  return (
    <form onSubmit={submitHandler}>
      <button type='submit'>Search</button>
      <input type="text" id='search' placeholder='type a name here' onChange={inputChangeHandler}/>
      <br />
      {!showFavorites? <button onClick={filterFavoritesHandler}>Favorites</button> : <button onClick={showAllHandler}>All items</button>}
    </form>
  )
}

export default ItemFilter