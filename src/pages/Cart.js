import { useContext, useState } from 'react';
import React from 'react';
import CartContext from '../store/cart-context';
import CartItem from '../components/Cart/CartItem';
import Modal from '../components/UI/Modal';
import '../styles/cartItems.css';
import postRequestData from '../services/postService';
import deleteRequestData from '../services/deleteService';

const Cart = ({userId}) => {
    const cartCtx = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    const { items } = useContext(CartContext);


    function showModalHander() {
      setShowModal(true);
    }

    function hideModalHandler() {
      setShowModal(false);
    }

    function orderHandler() {
      showModalHander();
      const url = `http://localhost:8080/orderItems/place_order/${userId}`;
      postRequestData(url)
      
      cartCtx.clearCart();
      deleteRequestData(`http://localhost:8080/cartItems/deleteAll/${userId}`);
    }

     const theCartItems = items.map(item => {
         return <CartItem key={item.type + item.id} product={item} />
     })

     const isCartPopulated = theCartItems.length > 0;



  return (
     <main className='cart'>
         {isCartPopulated && theCartItems}
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