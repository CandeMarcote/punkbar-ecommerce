import { useState, useEffect } from 'react';

const amountOfItemsPerPage = 10;


const ItemPagination = (props) => {
    const [currentPage, setCurrentPage] = useState(JSON.parse(localStorage.getItem('currentPage')) || 1);
    const totalAmount = props.totalAmount;
    const lastPage = Math.ceil(totalAmount/amountOfItemsPerPage);
    
    function nextPageHandler() {
        const nextPage = currentPage + 1;

        if(nextPage > lastPage) {
            return;
        }
        setCurrentPage(nextPage);
    }

    function prevPageHandler() {
        const prevPage = currentPage - 1;

        if(prevPage < 1) {
            return;
        }
        setCurrentPage(prevPage);
    }

    function goToFirstPage() {
        setCurrentPage(1)
    }
    
    function goToLastPage() {
        setCurrentPage(lastPage)
    }

    useEffect(()=>{
        props.onGetCurrentPage(currentPage)
    }, [currentPage])

    return (
        <div>
            <p>Page: {currentPage}</p>
            <button onClick={goToFirstPage}> {'<<'} </button>
            <button onClick={prevPageHandler}>Previous</button>
            <button onClick={nextPageHandler}>Next</button>
            <button onClick={goToLastPage}> {'>>'} </button>
        </div>
    )
}

export default ItemPagination