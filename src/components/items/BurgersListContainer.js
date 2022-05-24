import React, { useEffect, useContext, useState } from 'react';
import getRequestData from '../../services/services';
import ItemList from './ItemList';
import ItemPagination from './filters/ItemPagination';
import FavoritesContext from '../../store/favorites-context';
import FilterFavorites from './filters/FilterFavorites';
import SearchByName from './filters/SearchByName';

import '../../styles/main.css';
import '../../styles/filters.css';
import '../../styles/itemListContainer.css';

const itemsPerPage = 10;

const BurgersContainer = () => {
    const [burgersOnShow, setBurgersOnShow] = useState([]);
    const [burgersCurrentPage, setBurgersCurrentPage] = useState(localStorage.getItem('burgersCurrentPage'));
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filterFavorites, setFilterFavorites] = useState(false)

    const favoriteBurgers = useContext(FavoritesContext);

    const faveBurgers = favoriteBurgers.items.filter(item => {
        return item.type === 'burger'}
    );

    //Filter favorites
    function filterFavoritesHandler() {
        setFilterFavorites(true);
    }

    function showAllHandler() {
        setFilterFavorites(false);
    }

    //Pagination
    function getCurrentPageHandler(page) {
        setBurgersCurrentPage(page)
    }

    //Search by name
    function getSearchValueHandler(name) {
        setSearchValue(name);
    }

    let getFetch = async (page) => {
        if(searchValue.trim() === '') {
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
                    faved: false,
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
                    faved: false,
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
        localStorage.setItem('burgersCurrentPage', burgersCurrentPage);
        getFetch(burgersCurrentPage);
    }, [searchValue, burgersCurrentPage]);

  return (
    <main className='Beers Burgers'>
    <div className='filterContainer'>
        <div>
            <FilterFavorites onGetSearchValue={getSearchValueHandler} onFilterFavorites={filterFavoritesHandler} onShowAll={showAllHandler} filterFavoritesStatus={filterFavorites} />
        </div>
        <div>
            <SearchByName onGetSearchValue={getSearchValueHandler} />
        </div>
    </div>
    <div className='itemListContainer'>
        {!searchValue && !filterFavorites && <ItemPagination onGetCurrentPage={getCurrentPageHandler} totalAmount={28} currentPage={burgersCurrentPage}/>}
        {!isLoading && burgersOnShow.length > 0 && !filterFavorites && <ItemList products={burgersOnShow}/>}
        {!isLoading && faveBurgers.length > 0 && filterFavorites && <ItemList products={faveBurgers}/> }
        {!isLoading && burgersOnShow.length === 0 && <p>No results...</p>}
        {isLoading && <p>Spinner</p>}
    </div>
    </main>
  )
}

export default BurgersContainer