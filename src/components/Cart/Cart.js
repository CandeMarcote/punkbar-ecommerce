import { useContext } from 'react';
import React from 'react';
import Modal from '../../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from '../../Cart/CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const isCartPopulated= Boolean(cartCtx.items.length)
    const cartItems = cartCtx.items.map(item => {
        return <CartItem key={item.id} product={item} />
    })
  return (
    <Modal onClose={props.onClose}>
        {isCartPopulated && cartItems}
        {!isCartPopulated && <p>There are no items in the cart yet...</p>}
    </Modal>
  )
}

export default Cart