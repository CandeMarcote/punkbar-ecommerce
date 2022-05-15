import React from 'react';
import ToggleFavorite from './ToggleFavorite';


const FavoriteItem = ({ item }) => {
    
  return (
    <div>
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
    </div>
  )
}

export default FavoriteItem