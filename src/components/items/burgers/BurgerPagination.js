import React, { useState, useEffect } from 'react';

const totalAmount = 28;
const itemsPerPage = 10;
const lastPage = Math.ceil(totalAmount/itemsPerPage);

const BurgerPagination = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [firstIndex, setFirstIndex] = useState(0);

    function goToFirstPageHandler() {
        setCurrentPage(1);
        setFirstIndex(0);
    }

    function prevHandler() {
        const prevPage = currentPage - 1;
        if(prevPage < 1) return;
        const firstIndex = prevPage * itemsPerPage;
        setCurrentPage(prevPage);
        setFirstIndex(firstIndex)
    }

    function nextHandler() {
        const nextPage = currentPage + 1;
        const firstIndex = (nextPage-1) * itemsPerPage;
        if(nextPage > lastPage) return;
        setCurrentPage(nextPage);
        setFirstIndex(firstIndex);
    }

    function goToLastPage() {
        const firstIndex = Math.floor(totalAmount / itemsPerPage);
        setCurrentPage(lastPage);
        setFirstIndex(firstIndex);
    }

    useEffect(()=>{
        props.onGetIndexAndPage(firstIndex, currentPage)
    }, [currentPage, firstIndex])


  return (
    <div>
        <button onClick={goToFirstPageHandler}>{'<<'}</button>
        <button onClick={prevHandler}>Previous</button>
        <span> page: {currentPage} </span>
        <button onClick={nextHandler}>Next</button>
        <button onClick={goToLastPage}>{'>>'}</button>
    </div>
  )
}

export default BurgerPagination