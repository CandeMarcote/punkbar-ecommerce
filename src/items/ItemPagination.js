import React, { useState } from 'react';
import ItemList from './ItemList';

const amountOfItemsPerPage = 10;

const ItemPagination = (props) => {
    const [itemsPerPage, setItemsPerPage] = useState([...props.products].splice(0, amountOfItemsPerPage));
    const [currentPage, setCurrentPage] = useState(window.localStorage.getItem('currentPage'));

    function nextPageHandler() {
        const totalAmount = props.products.length;
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
        const totalAmount = props.products.length;
        const lastPage = totalAmount / amountOfItemsPerPage;
        setItemsPerPage([...props.products].splice(lastPage, amountOfItemsPerPage))
        setCurrentPage(lastPage)
    }

    window.localStorage.setItem('currentPage', currentPage )

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