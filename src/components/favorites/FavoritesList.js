import React, { useContext } from 'react';
import FavoriteItem from './FavoriteItem';
import FavoritesContext from '../../store/favorites-context';

const FavoritesList = () => {
    const favoritesCtx = useContext(FavoritesContext);
    const arr = favoritesCtx.items.map(item => {
        return <FavoriteItem item={item} key={item.id}/>
    })
    
  return (
    <div>
        <h3>These are your favorites!</h3>
        {arr}
    </div>
  )
}

export default FavoritesList