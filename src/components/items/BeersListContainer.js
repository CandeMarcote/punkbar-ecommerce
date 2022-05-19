import React, { useState, useEffect, useContext } from 'react';
import getRequestData from '../../services/services';
import ItemFilter from './ItemFilter';
import ItemList from './ItemList';
import ItemPagination from './ItemPagination';
import FavoritesContext from '../../store/favorites-context';
import FilterByIbu from './FilterByIbu';

const itemsPerPage = 10;

const ItemListContainer = () => {
    const favorites = useContext(FavoritesContext).items
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [beersCurrentPage, setBeersCurrentPage] = useState(localStorage.getItem('beersCurrentPage') || 1);
    const [searchValue, setSearchValue] = useState('');
    const [greatestIbu, setGreatestIbu] = useState(undefined);
    const [smallestIbu, setSmallestIbu] = useState(undefined);
    const [filterFavorites, setFilterFavorites] = useState(false)
    
    //Pagination
    function getCurrentPageHandler(page) {
        setBeersCurrentPage(page)
    }

    //Search by name
    function getSearchValue(val) {
        setSearchValue(val);
    }

    //Search by IBU
    function getIbuValuesHandler(min,max) {
        setSmallestIbu(min);
        setGreatestIbu(max);
    }

    //Filter favorites
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
            const url = `https://api.punkapi.com/v2/beers?beer_name=${searchValue}`;
            res = await getRequestData(url)

        } else if (smallestIbu || greatestIbu) {
            const url = `https://api.punkapi.com/v2/beers?ibu_gt=${smallestIbu}&ibu_lt=${greatestIbu}`;
            res = await getRequestData(url);
            
        }else {
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
                faved: false,
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
    <>
        <ItemPagination onGetCurrentPage={getCurrentPageHandler} totalAmount={325}/>
        <ItemFilter onGetSearchValue={getSearchValue} onFilterFavorites={filterFavoritesHandler} onShowAll={showAllHandler}/>
        <FilterByIbu onGetIbuValues={getIbuValuesHandler} />
        {isLoading && <p>Spinner</p>}
        {!isLoading && !filterFavorites && products.length > 0 && <ItemList products={products}/>}
        {!isLoading && filterFavorites && <ItemList products={favorites}/> }
        {!isLoading && !products.length && <p>No results...</p>}
    </>
  )
}

export default ItemListContainer