import { useContext } from 'react';
import React from 'react';
import CartContext from '../store/cart-context';
import CartItem from '../components/Cart/CartItem';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const isCartPopulated= Boolean(cartCtx.items.length)
    const cartItems = cartCtx.items.map(item => {
        return <CartItem key={item.id} product={item} />
    })
  return (
    <div>
        {isCartPopulated && cartItems}
        {!isCartPopulated && <p>There are no items in the cart yet...</p>}
    </div>
  )
}

export default Cart