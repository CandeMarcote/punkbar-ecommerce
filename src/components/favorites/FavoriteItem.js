import React, { useState } from 'react';
import ToggleFavorite from './ToggleFavorite';
import ItemDetail from '../items/ItemDetail';


const FavoriteItem = ({ item }) => {
  const [showDetail, setShowDetail] = useState(false);

  function showDetailHandler(e){
    e.stopPropagation();
    setShowDetail(true);
  }

  function hideDetailHandler(e) {
    e.stopPropagation();
    setShowDetail(false);
  }
    
  return (
    <>
      {item.type === 'beer' && (
        <div onClick={showDetailHandler} className='favoriteItem favoriteBeer'>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p>IBU: {item.ibu}</p>
          <p>ABV: {item.abv}</p>
          <p className='price'>$ {item.price.toFixed(2)}</p>
          <ToggleFavorite product={item}/>
          {showDetail && <ItemDetail product={item} onClose={hideDetailHandler}/>}
        </div>
      )}
      {item.type === 'burger' && (
        <div onClick={showDetailHandler} className='favoriteItem favoriteBurger'>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
          <p className='price'>$ {item.price.toFixed(2)}</p>
          <ToggleFavorite product={item}/>
          {showDetail && <ItemDetail product={item} onClose={hideDetailHandler}/>}
        </div>
      )}
    </>

  )
}

export default FavoriteItem