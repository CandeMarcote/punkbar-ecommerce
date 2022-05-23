import { useContext, useState } from 'react';
import React from 'react';
import CartContext from '../store/cart-context';
import CartItem from '../components/Cart/CartItem';
import Modal from '../components/UI/Modal';
import '../styles/cartItems.css'

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
    <main className='cart'>
        {isCartPopulated && cartItems}
        {!isCartPopulated && <p className='emptyCart'>There are no items in the cart yet...</p>}
        {isCartPopulated && <button onClick={orderHandler} className='orderButton'>Order now!</button>}
        {showModal && <Modal onClose={hideModalHandler}>
          <div className='modal-success'>
            <p>Your order was placed succesfully!</p>
            <button onClick={hideModalHandler}>Ok</button>
          </div>
          </Modal>}
    </main>
  )
}

export default Cart