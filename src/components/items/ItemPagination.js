import React, { useState } from 'react';
import ItemList from './ItemList';

const amountOfItemsPerPage = 10;
const totalAmount = 325;
export let page = undefined; 

const ItemPagination = (props) => {
    const [itemsPerPage, setItemsPerPage] = useState([...props.products].splice(0, amountOfItemsPerPage));
    const [currentPage, setCurrentPage] = useState(0);

    function nextPageHandler() {
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * amountOfItemsPerPage;

        if(firstIndex >= totalAmount) {
            return;
        }

        setItemsPerPage([...props.products].splice(firstIndex, amountOfItemsPerPage));
        setCurrentPage(nextPage);
    }

    function prevPageHandler() {
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * amountOfItemsPerPage;

        if(firstIndex < 0) {
            return;
        }

        setItemsPerPage([...props.products].splice(firstIndex, amountOfItemsPerPage));
        setCurrentPage(prevPage);
    }

    function goToFirstPage() {
        setItemsPerPage([...props.products].splice(0, amountOfItemsPerPage))
        setCurrentPage(0)
    }
    function goToLastPage() {
        const lastPage = (totalAmount / amountOfItemsPerPage).toFixed();
        setItemsPerPage([...props.products].splice(lastPage, amountOfItemsPerPage))
        setCurrentPage(lastPage)
    }

    props.onGetCurrentPage(currentPage)

    page = currentPage

  return (
    <ItemList products={itemsPerPage} 
    currentPage={currentPage} 
    nextPageHandler={nextPageHandler} 
    prevPageHandler={prevPageHandler} 
    goToFirstPage={goToFirstPage}
    goToLastPage={goToLastPage}
    />
  )
}

export default ItemPagination