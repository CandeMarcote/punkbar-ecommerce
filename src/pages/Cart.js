import React from 'react';
import Cart from '../components/Cart/Cart';

const CartPage = ({userId}) => {
  return (
    <Cart userId={userId}></Cart>
  )
}

export default CartPage