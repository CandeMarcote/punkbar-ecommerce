import React, { useContext, useState } from 'react';
import FavoritesList from './FavoritesList';
import Card from '../UI/Card';
import FilterFavoritesByName from './FilterFavoritesByName';
import FavoritesContext from '../../store/favorites-context';

const FavoritesListContainer = () => {
    const [searchValue, setSearchValue] = useState('');
    const favoritesCtx = useContext(FavoritesContext);

    const existingItem = favoritesCtx.items.filter(item => item.name.toLowerCase().trim() === searchValue.toLowerCase().trim());

    function getSearchValueHandler(val) {
      setSearchValue(val);
    }

  return (
    <Card>
        <h3>These are your favorites!</h3>
        <br />
        <FilterFavoritesByName onGetSearchValue={getSearchValueHandler} />
        {!searchValue ? <FavoritesList items={favoritesCtx.items}/> : <FavoritesList items={existingItem}/>}
    </Card>
  )
}

export default FavoritesListContainer