import React, { useContext } from 'react';
import FavoritesContext from '../../store/favorites-context';


const FavoriteItem = ({item: {name, price, ibu, abv, description}}) => {
    const favoritesCtx = useContext(FavoritesContext);
    
  return (
    <div>
        <p>{name}</p>
        <p>{ibu}</p>
        <p>{abv}</p>
        <p>{price}</p>
        <p>{description}</p>
    </div>
  )
}

export default FavoriteItem