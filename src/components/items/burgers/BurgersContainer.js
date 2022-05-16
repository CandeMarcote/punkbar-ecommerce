import React, { useEffect, useContext, useState } from 'react';
import getRequestData from '../../../services/services';
import BurgersList from './BurgersList';
import ItemFilter from '../ItemFilter';
import FavoritesContext from '../../../store/favorites-context';

const BurgersContainer = () => {
    const [burgers, setBurgers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filterFavorites, setFilterFavorites] = useState(false);

    const faveBurgers = useContext(FavoritesContext).items.filter(item => {
        return item.type === 'burger'}
    );

    function filterByNameHandler() {
        const itemIndex = burgers.filter(item => {
            return item.name.toLowerCase().trim().includes(searchValue);
        });

        const item = burgers[itemIndex];
        console.log(item.name.includes(searchValue).toLowerCase().trim())
    }

    function getSearchValue(val) {
        setSearchValue(val)
    }

    function filterFavoritesHandler() {
        setFilterFavorites(true);
    }

    function showAllHandler() {
        setFilterFavorites(false);
    }

    let getFetch = async () => {
        let res = undefined;
        setIsLoading(true)
        const url = 'https://my-burger-api.herokuapp.com/burgers';
        res = await getRequestData(url);

        const transformData = res.map(product => {
            return {
                id: product.id,
                name: product.name,
                ingredients: product.ingredients,
                price: 10,
                type: 'burger',
                img: "https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/cdn/a503e7eb-0166-4f30-86d6-d276dfcbd3bc/42447522-65cd-428e-ae12-14a2b3754be4_560_420.jpg",
            }
        })
        setBurgers(transformData);
        setIsLoading(false);
    }

    useEffect(()=> {
        getFetch();
    }, []);

  return (
    <>
    <ItemFilter onFilterFavorites={filterFavoritesHandler} onShowAll={showAllHandler} onGetSearchValue={getSearchValue} onFilterByName={filterByNameHandler}/>
    {isLoading && <p>Spinner</p>}
    {!isLoading && burgers.length > 0 && <BurgersList products={burgers}/>}
    {!isLoading && filterFavorites && <BurgersList products={faveBurgers}/> }
    {!isLoading && !burgers.length && <p>No results...</p>}
    </>
  )
}

export default BurgersContainer