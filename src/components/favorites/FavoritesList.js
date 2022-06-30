import React from 'react';
import FavoriteItem from './FavoriteItem';

const FavoritesList = (props) => {
    const arr = props.items.map(item => {
        return <FavoriteItem item={item} key={item.type + item.id}/>
    })
    
  return (
    <div>
        {arr}
    </div>
  )
}

export default FavoritesList