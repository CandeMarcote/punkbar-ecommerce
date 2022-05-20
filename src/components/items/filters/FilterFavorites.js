import React, { useState } from 'react';

const ItemFilter = (props) => {
  const [showFavorites, setShowFavorites] = useState(false);

  function filterFavoritesHandler() {
    setShowFavorites(true);
    props.onFilterFavorites();
  }

  function showAllHandler() {
    setShowFavorites(false);
    props.onShowAll();
  }
  
  return (
    <>
      {!showFavorites? <button onClick={filterFavoritesHandler}>Favorites</button> : <button onClick={showAllHandler}>All items</button>}
    </>
  )
}

export default ItemFilter