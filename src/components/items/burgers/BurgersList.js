import React from 'react';
import Item from '../Item';
import Card from '../../UI/Card'

const BurgersList = ({products}) => {

    const burgers = products.map(item => {
        return <Item product={item} key={item.id} />
    })    
  return (
    <Card>
    {burgers}
    </Card>
  )
}

export default BurgersList