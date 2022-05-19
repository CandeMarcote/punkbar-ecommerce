import React, { useEffect, useContext, useState } from 'react';
import getRequestData from '../../services/services';
import ItemList from './ItemList';
import ItemPagination from './ItemPagination'
import FavoritesContext from '../../store/favorites-context';
import ItemFilter from './ItemFilter';

const itemsPerPage = 10;

const BurgersContainer = () => {
    const [burgersOnShow, setBurgersOnShow] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(localStorage.getItem('burgersCurrentPage') || 1);
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

    function getCurrentPageHandler(page) {
        setCurrentPage(page);
    }

    let getFetch = async (page) => {
        if(searchValue.trim().length === 0) {
            let res = undefined;
            setIsLoading(true)
            const url = `https://my-burger-api.herokuapp.com/burgers?_page=${page}&_limit=${itemsPerPage}`;
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
            });
            setBurgersOnShow(transformData);
        } else {
            let res = undefined;
            setIsLoading(true)
            const url = `https://my-burger-api.herokuapp.com/burgers`;
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
            });
    
            const existingItem = transformData.filter(item => {
                const name = item.name.toLowerCase().trim();
                return name.includes(searchValue.toLowerCase().trim())
            });
    
            setBurgersOnShow(existingItem);
        }
        setIsLoading(false);
    }

    useEffect(()=> {
        localStorage.setItem('burgersCurrentPage', currentPage)
        getFetch(currentPage);
    }, [currentPage, searchValue]);

  return (
    <>
    <ItemPagination onGetCurrentPage={getCurrentPageHandler} totalAmount={25}/>
    <ItemFilter onGetSearchValue={getSearchValueHandler} onFilterFavorites={filterFavoritesHandler} onShowAll={showAllHandler} filterFavoritesStatus={filterFavorites} />
    {isLoading && <p>Spinner</p>}
    {!isLoading && burgersOnShow.length > 0 && !filterFavorites && <ItemList products={burgersOnShow}/>}
    {!isLoading && faveBurgers.length > 0 && filterFavorites && <ItemList products={faveBurgers}/> }
    {!isLoading && burgersOnShow.length === 0 && <p>No results...</p>}
    </>
  )
}

export default BurgersContainer