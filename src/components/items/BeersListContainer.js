import React, { useState, useEffect, useContext } from 'react';
import getRequestData from '../../services/services';
import FilterFavorites from './filters/FilterFavorites';
import ItemList from './ItemList';
import ItemPagination from './filters/ItemPagination';
import FavoritesContext from '../../store/favorites-context';
import FilterByIbu from './filters/FilterByIbu';
import Main from '../layout/Main';
import './itemListContainer.css'
import classes from './filters/FilterAndPagination.module.css';
import SearchByName from './filters/SearchByName';

const itemsPerPage = 10;

const ItemListContainer = () => {
    const favorites = useContext(FavoritesContext).items
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [beersCurrentPage, setBeersCurrentPage] = useState(localStorage.getItem('beersCurrentPage') || 1);
    const [searchValue, setSearchValue] = useState('');
    const [filterFavorites, setFilterFavorites] = useState(false)
    const [smallestIbu, setSmallestIbu] = useState(0);
    const [greatestIbu, setGreatestIbu] = useState(100);

    //Pagination
    function getCurrentPageHandler(page) {
        setBeersCurrentPage(page)
    }

    //Search by name
    function getSearchValue(val) {
        setSearchValue(val)
    }

    //Filter by IBU
    function getIbuValuesHandler(min,max) {
        setSmallestIbu(min);
        setGreatestIbu(max);
    }

    //Filter Favorites
    function filterFavoritesHandler() {
        setFilterFavorites(true);
    }

    function showAllHandler() {
        setFilterFavorites(false);
    }
    
    let getFetch = async (page) => {
        let res = undefined;
        setIsLoading(true)
        if (searchValue) {
            const url = `https://api.punkapi.com/v2/beers?beer_name=${searchValue}&per_page=${itemsPerPage}`;
            res = await getRequestData(url)
        } else if (smallestIbu || greatestIbu) {
            const url = `https://api.punkapi.com/v2/beers?ibu_gt=${smallestIbu}&ibu_lt=${greatestIbu}&per_page=${itemsPerPage}`;
            res = await getRequestData(url);
            
        } else {
            const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${itemsPerPage}`;
            res = await getRequestData(url);
        }

        const transformData = res.map(product => {
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                ibu: product.ibu,
                abv: product.abv,
                price: product.ph,
                img: product.image_url,
                type: 'beer',
            }
        })
        setProducts(transformData)
        setIsLoading(false)
    }

    useEffect(()=> {
        localStorage.setItem('beersCurrentPage', beersCurrentPage)
        getFetch(beersCurrentPage);
    }, [beersCurrentPage, searchValue, smallestIbu, greatestIbu])

  return (
    <Main>
    <div className='filterContainer'>
        <SearchByName onGetSearchValue={getSearchValue} />
        <FilterFavorites onFilterFavorites={filterFavoritesHandler} onShowAll={showAllHandler}/>
        <FilterByIbu onGetIbuValues={getIbuValuesHandler}/>
    </div>
        <ItemPagination onGetCurrentPage={getCurrentPageHandler} totalAmount={325} currentPage={beersCurrentPage}/>
        <div className='itemListContainer'>
            {isLoading && <p>Spinner</p>}
            {!isLoading && !filterFavorites && products.length > 0 && <ItemList products={products}/>}
            {!isLoading && filterFavorites && <ItemList products={favorites}/> }
            {!isLoading && !products.length && <p>No results...</p>}
        </div>
    </Main>
  )
}

export default ItemListContainer