import { useContext, useEffect, useState } from 'react';
import React from 'react';
import CartContext from '../store/cart-context';
import CartItem from '../components/Cart/CartItem';
import Modal from '../components/UI/Modal';
import '../styles/cartItems.css';
import postRequestData from '../services/postService';
import getRequestData from '../services/services';

const Cart = ({userId}) => {
    const cartCtx = useContext(CartContext);
    const [productsFromApi, setProductsFromApi] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const theUserId = userId;
    const isCartPopulated= Boolean(cartCtx.items.length);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      getFetch();
    },[cartCtx.items])

    let getFetch = async () => {
      setIsLoading(true)
      setProductsFromApi([]);
      for (let i = 0; i < cartCtx.items.length; i++) {
        const element = cartCtx.items[i];
        if(element.category === "beer") {
          const url = `https://api.punkapi.com/v2/beers?ids=${element.productNumber}`;

          const res = await getRequestData(url);
          const transformData = res.map(product => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              ibu: product.ibu,
              abv: product.abv,
              price: product.ph,
              img: product.image_url,
              type: 'beer',
              amount: element.amount
            }
          });
          console.log(transformData)
          const updatedItems = productsFromApi.concat(transformData)
          setProductsFromApi(updatedItems)
        }
      }
      setIsLoading(false);
    }

    function showModalHander() {
      setShowModal(true);
    }

    function hideModalHandler() {
      setShowModal(false);
    }

    function orderHandler() {
      showModalHander();
      const url = `http://localhost:8080/orderItems/place_order?userId=${theUserId}`;
      postRequestData(url)
      cartCtx.clearCart();
    }

      const cartItems = productsFromApi.map(item => {
        return <CartItem key={item.id} product={item} />
      })
    // const cartItems = cartCtx.items.map(item => {
    //     return <CartItem key={item.id} product={item} />
    // })

  return (
    <main className='cart'>
        {isCartPopulated && !isLoading && cartItems}
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