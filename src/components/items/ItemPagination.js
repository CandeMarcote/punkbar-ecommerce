import { useState } from 'react';

const amountOfItemsPerPage = 10;
const totalAmount = 325;

const ItemPagination = (props) => {
    const [currentPage, setCurrentPage] = useState(1);

    function nextPageHandler() {
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * amountOfItemsPerPage;

        if(firstIndex >= totalAmount) {
            return;
        }
        setCurrentPage(nextPage);
    }

    function prevPageHandler() {
        const prevPage = currentPage - 1;
        const firstIndex = prevPage * amountOfItemsPerPage;

        if(firstIndex < 0) {
            return;
        }
        setCurrentPage(prevPage);
    }

    function goToFirstPage() {
        setCurrentPage(0)
    }
    function goToLastPage() {
        const lastPage = (totalAmount / amountOfItemsPerPage).toFixed();
        setCurrentPage(lastPage)
    }

    props.onGetCurrentPage(currentPage)

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