import React from 'react';


const FavoriteItem = ({item: {name, price, ibu, abv, description}}) => {
    
  return (
    <div>
        <p>{name}</p>
        <p>{ibu}</p>
        <p>{abv}</p>
        <p>{price}</p>
        <p>{description}</p>
    </div>
  )
}

export default FavoriteItem