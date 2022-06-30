import { useContext, useEffect, useState } from 'react';
import React from 'react';
import CartContext from '../store/cart-context';
import CartItem from '../components/Cart/CartItem';
import Modal from '../components/UI/Modal';
import '../styles/cartItems.css';
import getRequestData from '../services/services';
import postRequestData from '../services/postService';
//import getRequestData from '../services/services';

const Cart = ({userId}) => {
    //const cartCtx = useContext(CartContext);
    const [showModal, setShowModal] = useState(false);
    //const isCartPopulated= Boolean(cartCtx.items.length);

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const theUserId = 1;

    useEffect(()=> {
      getDB()
    }, []);

    //GET ITEMS FROM DB
    let getDB = async () => {
      setIsLoading(true)
      const url = `http://localhost:8080/cartItems/${theUserId}/all`;
      const res = await getRequestData(url);

      let items = []
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if(element.category === "beer") {
          const response = await getRequestData(`https://api.punkapi.com/v2/beers/${element.productNumber}`);
          const transform = response.map(item => {
            return {
              id: item.id,
              name: item.name,
              description: item.description,
              ibu: item.ibu,
              abv: item.abv,
              price: item.ph,
              img: item.image_url,
              amount: element.amount,
              type: 'beer',
            }
          })
          items = items.concat(transform);
        } else {
          const response = await getRequestData(`https://my-burger-api.herokuapp.com/burgers/${element.productNumber}`);
          const arrayAUX=[];
          arrayAUX.push(response)
          const transform = arrayAUX.map(item => {
            return {
              id: item.id,
              name: item.name,
              ingredients: item.ingredients,
              description:item.description,
              price: 10,
              type: 'burger',
              amount: element.amount,
              img: "https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/cdn/a503e7eb-0166-4f30-86d6-d276dfcbd3bc/42447522-65cd-428e-ae12-14a2b3754be4_560_420.jpg",
          }
          })
          items = items.concat(transform);
        }
        setIsLoading(false);
        if(!isLoading) {
          
          setCartItems(items);
        }
      }
    }
    
    console.log(cartItems)
  






    function showModalHander() {
      setShowModal(true);
    }

    function hideModalHandler() {
      setShowModal(false);
    }

    function orderHandler() {
      showModalHander();

      console.log(userId)
      const url = `http://localhost:8080/orderItems/place_order?userId=${userId}`;
      postRequestData(url)
      //cartCtx.clearCart();
    }

      /*const cartItems = productsFromApi.map(item => {
        return <CartItem key={item.id} product={item} />
      })*/

     const theCartItems = cartItems.map(item => {
         return <CartItem key={item.id} product={item} />
     })

  return (
    // <main className='cart'>
    //     {isCartPopulated && cartItems}
    //     {!isCartPopulated && <p className='emptyCart'>There are no items in the cart yet...</p>}
    //     {isCartPopulated && <button onClick={orderHandler} className='orderButton'>Order now!</button>}
    //     {showModal && <Modal onClose={hideModalHandler}>
    //       <div className='modal-success'>
    //         <p>Your order was placed succesfully!</p>
    //         <button onClick={hideModalHandler}>Ok</button>
    //       </div>
    //       </Modal>}
    // </main>

    <main>
      {theCartItems}
    </main>
  )
}

export default Cart