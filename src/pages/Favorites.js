import React from 'react';
import FavoriteItem from '../components/favorites/FavoriteItem'

const Favorites = () => {
  const item ={
    id: 1,
    name: 'name',
    ibu: 'ibu',
    abv: 'abv',
    price: 'price',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, totam. Expedita dolores corporis cum aut.',
    
  }
  return (
    <><FavoriteItem item={item}/></>
  )
}

export default Favorites