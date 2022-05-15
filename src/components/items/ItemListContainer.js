import React, { useState, useEffect, useContext } from 'react';
import getRequestData from '../../services/services';
import ItemFilter from './ItemFilter';
import ItemList from './ItemList';
import ItemPagination from './ItemPagination';
import FavoritesContext from '../../store/favorites-context';

const ItemListContainer = () => {
    const favorites = useContext(FavoritesContext).items
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [filterFavorites, setFilterFavorites] = useState(false)

    function getCurrentPageHandler(page) {
        setCurrentPage(page)
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
    
    let getFetch = async (page) => {
        let res = undefined;
        setIsLoading(true)
        if (searchValue) {
            const url = `https://api.punkapi.com/v2/beers?beer_name=${searchValue}`;
            res = await getRequestData(url)
        } else {
            const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;
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
            }
        })
        setProducts(transformData)
        setIsLoading(false)
    }

    useEffect(()=> {
        getFetch(currentPage);
    }, [currentPage, searchValue])

  return (
    <>
        <ItemPagination onGetCurrentPage={getCurrentPageHandler}/>
        <ItemFilter onGetSearchValue={getSearchValue} onFilterFavorites={filterFavoritesHandler} onShowAll={showAllHandler}/>
        {isLoading && <p>Spinner</p>}
        {!isLoading && !filterFavorites && products.length > 0 && <ItemList products={products}/>}
        {!isLoading && filterFavorites && <ItemList products={favorites}/> }
        {!isLoading && !products.length && <p>No results...</p>}
    </>
  )
}

export default ItemListContainer