import React from 'react';
import BurgerItem from './BurgerItem';
import Card from '../../UI/Card'

const BurgersList = ({products}) => {

    const burgers = products.map(item => {
        return <BurgerItem product={item} key={item.id} />
    })    
  return (
    <Card>
    {burgers}
    </Card>
  )
}

export default BurgersList