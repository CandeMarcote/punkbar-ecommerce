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
    <div onClick={showDetailHandler}>
      <hr />
      <br />
        <p>{item.name}</p>
        <p>{item.ibu}</p>
        <p>{item.abv}</p>
        <p>{item.price}</p>
        <p>{item.description}</p>
        <ToggleFavorite product={item}/>
        <br />
        <hr />
        <br />
        {showDetail && <ItemDetail product={item} onClose={hideDetailHandler}/>}
    </div>
  )
}

export default FavoriteItem