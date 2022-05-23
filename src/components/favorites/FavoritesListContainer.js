import React, { useContext, useState } from 'react';
import FavoritesList from './FavoritesList';
import SearchByName from '../items/filters/SearchByName';
import FavoritesContext from '../../store/favorites-context';
import '../../styles/favorites.css'

const FavoritesListContainer = () => {
    const [searchValue, setSearchValue] = useState('');
    const favoritesCtx = useContext(FavoritesContext);

    const existingItem = favoritesCtx.items.filter(item => item.name.toLowerCase().trim() === searchValue.toLowerCase().trim());

    function getSearchValueHandler(val) {
      setSearchValue(val);
    }

  return (
    <div className='favoriteItemContainer'>
        <h3>These are your favorites!</h3>
        <div className='filterContainer'>
          <SearchByName onGetSearchValue={getSearchValueHandler}/>
        </div>
        {!searchValue ? <FavoritesList items={favoritesCtx.items}/> : <FavoritesList items={existingItem}/>}
    </div>
  )
}

export default FavoritesListContainer