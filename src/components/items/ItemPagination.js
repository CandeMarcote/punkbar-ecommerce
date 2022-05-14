import { useState, useEffect } from 'react';

const amountOfItemsPerPage = 10;
const totalAmount = 330;

const ItemPagination = (props) => {
    const [currentPage, setCurrentPage] = useState(JSON.parse(localStorage.getItem('currentPage')) || 1);

    function nextPageHandler() {
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * amountOfItemsPerPage;

        if(firstIndex > totalAmount) {
            return;
        }
        setCurrentPage(nextPage);
    }

    function prevPageHandler() {
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * amountOfItemsPerPage;

        if(firstIndex < 1) {
            return;
        }
        setCurrentPage(prevPage);
    }

    function goToFirstPage() {
        setCurrentPage(1)
    }
    function goToLastPage() {
        const lastPage = (totalAmount / amountOfItemsPerPage).toFixed();
        setCurrentPage(lastPage)
    }

    useEffect(()=>{
        localStorage.setItem('currentPage', currentPage);
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