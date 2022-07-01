import React, { useContext, useState } from 'react';
import FavoritesList from './FavoritesList';
import SearchByName from '../items/filters/SearchByName';
import FavoritesContext from '../../store/favorites-context';
import '../../styles/favorites.css'

const FavoritesListContainer = () => {
    const [searchValue, setSearchValue] = useState('');
    const {items} = useContext(FavoritesContext);

    const existingItem = items.filter(item => item.name.toLowerCase().trim() === searchValue.toLowerCase().trim());

    function getSearchValueHandler(val) {
      setSearchValue(val);
    }

    const isFavoritesPopulated = items.length > 0;

    return (
     <div className='favoriteItemContainer'>
        {isFavoritesPopulated ? <h3>These are your favorites!</h3> : <h3>No favorites added yet...</h3>}
        <div className='filterContainer'>
          <SearchByName onGetSearchValue={getSearchValueHandler}/>
        </div>
    {!searchValue ? <FavoritesList items={items}/>  : <FavoritesList items={existingItem}/>}
    </div>
  )
}

export default FavoritesListContainer