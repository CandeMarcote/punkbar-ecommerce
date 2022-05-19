import React, { useContext, useState } from 'react';
import FavoritesList from './FavoritesList';
import Card from '../UI/Card';
import FilterFavoritesByName from './FilterFavoritesByName';
import FavoritesContext from '../../store/favorites-context';
import FilterByIbu from '../items/FilterByIbu';

const FavoritesListContainer = () => {
    const [searchValue, setSearchValue] = useState('');
    const [greatestIbu, setGreatestIbu] = useState(undefined);
    const [smallestIbu, setSmallestIbu] = useState(undefined);
    const favoritesCtx = useContext(FavoritesContext);

    //Search by name
    const existingItem = favoritesCtx.items.filter(item => item.name.toLowerCase().trim() === searchValue.toLowerCase().trim());

    function getSearchValueHandler(val) {
      setSearchValue(val);
    }

    //Search by IBU (only for beers)

    const favedBeers = favoritesCtx.items.filter(item => item.type === 'beer');
    const filterByIbu = favedBeers.filter(item => {
      return item.ibu > smallestIbu && item.ibu < greatestIbu
    })
    
    function getIbuValuesHandler(min,max) {
      setSmallestIbu(min);
      setGreatestIbu(max);
    }

  return (
    <Card>
        <h3>These are your favorites!</h3>
        <br />
        <FilterFavoritesByName onGetSearchValue={getSearchValueHandler} />
        <FilterByIbu onGetIbuValues={getIbuValuesHandler} />
        {!searchValue && !smallestIbu && !greatestIbu && <FavoritesList items={favoritesCtx.items}/>}
        {searchValue && <FavoritesList items={existingItem}/>}
        {(smallestIbu || greatestIbu) && <FavoritesList items={filterByIbu} /> }
    </Card>
  )
}

export default FavoritesListContainer