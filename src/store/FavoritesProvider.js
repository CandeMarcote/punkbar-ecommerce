import React, { useState } from 'react';
import FavoritesContext from './favorites-context';

const FavoritesProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  /* console.log(favorites) */

  const toggleFavoriteHandler = item => {
    const existingProductIndex = favorites.findIndex((product) => product.id === item.id);
    const existingProduct = favorites[existingProductIndex];

    let updateFavorites = undefined;

    if (existingProduct) {
      updateFavorites = favorites.filter((product) => product.id !== item.id)
    } else {;
      updateFavorites.concat(existingProduct);
    }
    setFavorites(updateFavorites);
  }

  const favoritesContext = {
      items: favorites,
      toggleItem: toggleFavoriteHandler,
  }

  return (
    <FavoritesContext.Provider value={favoritesContext}>
        {props.children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider;