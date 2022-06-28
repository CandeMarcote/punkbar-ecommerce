import { useState, useEffect } from 'react';
import '../../../styles/main.css';

const amountOfItemsPerPage = 10;


const ItemPagination = (props) => {
    const [currentPage, setCurrentPage] = useState(Number(props.currentPage) || 1);
    const [prevBtnIsDisabled, setPrevBtnIsDesabled] = useState(false);
    const [nextBtnIsDisabled, setNextBtnIsDesabled] = useState(false);
    const totalAmount = props.totalAmount;
    const lastPage = Math.ceil(totalAmount/amountOfItemsPerPage);
    
    function nextPageHandler() {
        const nextPage = currentPage + 1;
        setPrevBtnIsDesabled(false);

        if(nextPage > lastPage) {
            setNextBtnIsDesabled(true)
            return;
        }
        setCurrentPage(nextPage);
    }

    function prevPageHandler() {
        const prevPage = currentPage - 1;
        setNextBtnIsDesabled(false);

        if(prevPage < 1) {
            setPrevBtnIsDesabled(true);
            return;
        }
        setCurrentPage(prevPage);
    }

    function goToFirstPage() {
        setCurrentPage(1)
        setNextBtnIsDesabled(false);
        setPrevBtnIsDesabled(true);
    }
    
    function goToLastPage() {
        setCurrentPage(lastPage)
        setPrevBtnIsDesabled(false);
        setNextBtnIsDesabled(true);
    }

    useEffect(()=>{
        props.onGetCurrentPage(currentPage)
    }, [currentPage])

    return (
        <div className='pagination'>
            <button disabled={prevBtnIsDisabled} onClick={goToFirstPage}> {'<<'} </button>
            <button disabled={prevBtnIsDisabled} onClick={prevPageHandler}>{'<'}</button>
            <p> Page {currentPage}</p>
            <button disabled={nextBtnIsDisabled} onClick={nextPageHandler}>{'>'}</button>
            <button disabled={nextBtnIsDisabled} onClick={goToLastPage}> {'>>'} </button>
        </div>
    )
}

export default ItemPagination