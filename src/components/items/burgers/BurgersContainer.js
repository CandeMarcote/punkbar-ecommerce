import React, { useEffect, useContext, useState } from 'react';
import getRequestData from '../../../services/services';
import BurgersList from './BurgersList';
import BurgerPagination from './BurgerPagination';
import FavoritesContext from '../../../store/favorites-context';
import FilterFavoriteBurgers from './FilterFavoriteBurgers';

const itemsPerPage = 10;

const BurgersContainer = () => {
    const [allBurgers, setAllBurgers] = useState([]);
    const [burgersOnShow, setBurgersOnShow] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [index, setIndex] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [filterFavorites, setFilterFavorites] = useState(false)

    const favoriteBurgers = useContext(FavoritesContext);

    const faveBurgers = favoriteBurgers.items.filter(item => {
        return item.type === 'burger'}
    );

    function filterFavoritesHandler() {
        setFilterFavorites(true);
    }

    function showAllHandler() {
        setFilterFavorites(false);
    }

    function getSearchValueHandler(name) {
        setSearchValue(name);
    }

    function getIndexAndPageHandler(index, page) {
        setCurrentPage(page);
        setIndex(index);
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
        setAllBurgers(transformData);
        setBurgersOnShow([...transformData].splice(index, itemsPerPage));
        setIsLoading(false);
        if(searchValue.trim().length > 0 ) {
            const existingItem = allBurgers.filter(item => {
                const name = item.name.toLowerCase().trim();
                return name.includes(searchValue.toLowerCase().trim())
            })
            setBurgersOnShow(existingItem);
        }
    }

    useEffect(()=> {
        getFetch();
    }, [currentPage, index, searchValue]);

  return (
    <>
    <BurgerPagination onGetIndexAndPage={getIndexAndPageHandler}/>
    <FilterFavoriteBurgers onFilterByName={getSearchValueHandler} onFilterFavorites={filterFavoritesHandler} onShowAll={showAllHandler} />
    {isLoading && <p>Spinner</p>}
    {!isLoading && allBurgers.length > 0 && !filterFavorites && <BurgersList products={burgersOnShow}/>}
    {!isLoading && faveBurgers.length > 0 && filterFavorites && <BurgersList products={faveBurgers}/> }
    {!isLoading && !allBurgers.length || !faveBurgers || searchValue && <p>No results...</p>}
    </>
  )
}

export default BurgersContainer