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
      {item.type === 'beer' && 
        <div onClick={showDetailHandler}>
          <hr />
          <br />
            <h4>{item.name}</h4>
            <p>IBU: {item.ibu}</p>
            <p>ABV: {item.abv}</p>
            <p>$ {item.price.toFixed(2)}</p>
            <p>{item.description}</p>
            <ToggleFavorite product={item}/>
            <br />
            <hr />
            <br />
            {showDetail && <ItemDetail product={item} onClose={hideDetailHandler}/>}
        </div>
      }
      {item.type === 'burger' && (
        <div onClick={showDetailHandler}>
          <hr />
          <br />
          <h4>{item.name}</h4>
          <p>$ {item.price.toFixed(2)}</p>
          <ToggleFavorite product={item}/>
          <br />
          <hr />
          <br />
          {showDetail && <ItemDetail product={item} onClose={hideDetailHandler}/>}
        </div>
        )}
    </>
  )
}

export default FavoriteItem