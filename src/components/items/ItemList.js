import React from 'react';
import Item from './Item';
import Card from '../UI/Card';

  const itemList = ({products}) => {
  const arr = products.map((product) => {
    return <Item product={product} key={product.id}/>
  })

  return (
    <>
      {arr}
    </>
  )
}

export default itemList