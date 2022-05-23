import React, { useState } from 'react';
import '../../../styles/filters.css';

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
    <div>
      {!showFavorites? <button className='button' onClick={filterFavoritesHandler}>Favorites</button> : <button className='button' onClick={showAllHandler}>All items</button>}
    </div>
  )
}

export default ItemFilter