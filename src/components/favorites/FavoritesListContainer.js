import React, { useContext, useState, useEffect } from 'react';
import FavoritesList from './FavoritesList';
import SearchByName from '../items/filters/SearchByName';
import FavoritesContext from '../../store/favorites-context';
import '../../styles/favorites.css'
import getRequestData from '../../services/services';

const FavoritesListContainer = () => {
    const [searchValue, setSearchValue] = useState('');
    const {items} = useContext(FavoritesContext);

    const existingItem = items.filter(item => item.name.toLowerCase().trim() === searchValue.toLowerCase().trim());

    function getSearchValueHandler(val) {
      setSearchValue(val);
    }

  return (
     <div className='favoriteItemContainer'>
        <h3>These are your favorites!</h3>
        <div className='filterContainer'>
          <SearchByName onGetSearchValue={getSearchValueHandler}/>
        </div>
    {!searchValue ? <FavoritesList items={items}/>  : <FavoritesList items={existingItem}/>}
    </div>
  )
}

export default FavoritesListContainer