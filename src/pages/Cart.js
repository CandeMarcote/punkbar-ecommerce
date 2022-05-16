import { useContext, useState } from 'react';
import React from 'react';
import CartContext from '../store/cart-context';
import CartItem from '../components/Cart/CartItem';
import Modal from '../components/UI/Modal';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);

    const isCartPopulated= Boolean(cartCtx.items.length);

    function showModalHander() {
      setShowModal(true);
    }

    function hideModalHandler() {
      setShowModal(false);
    }

    function orderHandler() {
      showModalHander();
      cartCtx.clearCart();
    }

    const cartItems = cartCtx.items.map(item => {
        return <CartItem key={item.id} product={item} />
    })

  return (
    <div>
        {isCartPopulated && cartItems}
        {!isCartPopulated && <p>There are no items in the cart yet...</p>}
        {isCartPopulated && <button onClick={orderHandler}>Order now!</button>}
        {showModal && <Modal onClose={hideModalHandler}>
          <div>
            <p>Your order was placed succesfully!</p>
            <button onClick={hideModalHandler}>Ok</button>
          </div>
          </Modal>}
    </div>
  )
}

export default Cart