import React, { useRef, useState } from 'react';

const FilterFavoriteBurgers = (props) => {
    const [showFavorites, setShowFavorites] = useState(false)
    const inputValueRef = useRef();

    function filterFavoritesHandler() {
        setShowFavorites(true);
        props.onFilterFavorites();
        props.onFilterByName();
    }

    function showAllHandler() {
      setShowFavorites(false);
      props.onShowAll();
    }
    
    function searchHandler(e) {
        e.preventDefault();
        const inputValue = inputValueRef.current.value;
        props.onFilterByName(inputValue);
    };

  return (
    <>
    <form onSubmit={searchHandler}>
        <input type="text" placeholder='type a name here' ref={inputValueRef}/>
        <button type='submit'>Search </button>
    </form>
    {!showFavorites ? <button onClick={filterFavoritesHandler}>Favorites</button> : <button onClick={showAllHandler}>All Burgers</button>}
    </>
  )
}

export default FilterFavoriteBurgers