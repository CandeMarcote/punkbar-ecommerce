import React from 'react';
import Item from './Item';
import Card from '../UI/Card';

const itemList = (props) => {
  const arr = props.products.map((product) => {
    return <Item product={product} key={product.id}/>
  })

  return (
    <Card>
      {arr}
    </Card>
  )
}

export default itemList