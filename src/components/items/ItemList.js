import React from 'react';
import Item from './Item';
import '../../styles/main.css'

  const itemList = ({products}) => {
  const arr = products.map((product) => {
    return <Item product={product} key={product.id}/>
  })

  return (
    <div className='itemList'>
      {arr}
    </div>
  )
}

export default itemList