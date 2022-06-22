import { useState, useEffect } from "react";
import CartContext from "./cart-context";
import FavoritesContext from "./favorites-context";
import postRequestData from "../services/postService";
import deleteRequestData from "../services/deleteService";
import getRequestData from "../services/services";

getRequestData(http://localhost:8080/favorites/)

const ContextProvider = (props) => {
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cartProducts')) || []);
    const [totalAmount, setTotalAmount] = useState(0);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(()=> {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [cartProducts, favorites]);
    
    function AddItemToCartHandler (item) {
      const updatedTotalAmount = totalAmount + item.amount;
      
      const existingItemIndex = cartProducts.findIndex(element => element.id === item.id);
        const existingItem = cartProducts[existingItemIndex];
        let updatedItems = undefined;

        if(existingItem) {
          const updatedItem = {
            ...existingItem,
                amount: existingItem.amount + item.amount
              };
              updatedItems = [...cartProducts];
              updatedItems[existingItemIndex] = updatedItem;
        } else {
          updatedItems = cartProducts.concat(item);
       }
      setCartProducts(updatedItems)
      setTotalAmount(updatedTotalAmount)
    }
          
    function removeItemFromCart (id) {
      const updatedTotalAmount = totalAmount - 1
      const existingProductIndex = cartProducts.findIndex((product) => product.id === id);
      const existingProduct = cartProducts[existingProductIndex];
      
      let updatedProducts = undefined;
      
      if(existingProduct.amount > 1) {
        const updatedProduct = {
          ...existingProduct,
          amount: existingProduct.amount - 1
        }
          updatedProducts = [...cartProducts];
          updatedProducts[existingProductIndex] = updatedProduct;
      } else {
          updatedProducts = cartProducts.filter((product) => product.id !== id)
      }
      setCartProducts(updatedProducts);
      setTotalAmount(updatedTotalAmount)
    }

    function removeAllUnits(id) {
      const updatedProducts = cartProducts.filter((product) => product.id !== id);
      const updatedTotalAmount = totalAmount - 1;
      setCartProducts(updatedProducts);
      setTotalAmount(updatedTotalAmount);        
    }

    function clearCart() {
      const clearCart = [];
      const clearAmount = 0;
      setCartProducts(clearCart);
      setTotalAmount(clearAmount);
    }
    
    function toggleFavoriteHandler(item){
      const existingItemIndex = favorites.findIndex(element => element.id === item.id);
      const existingItem = favorites[existingItemIndex];
      let updatedItems = undefined;

      console.log('inside the function')
      
      if(!existingItem) {
        const url = "http://localhost:8080/favorites/";
        const theItem = {
          productNumber: item.id,
          name: item.name,
          category: item.type,
          userId: 3,
        }
        
        postRequestData(url, theItem);
        updatedItems = [...favorites, item];
      } else {
        console.log("inside the else statement for the delete request")
        const userId = 3;
        const favoriteId = 18;
        const url = `http://localhost:8080/favorites/users/${userId}/favorite/${favoriteId}`;
        deleteRequestData(url);
        updatedItems = favorites.filter(element => element.id !== item.id);
      }
      setFavorites(updatedItems)
    }
    
    const cartContext = {
      items: cartProducts,
      totalAmount: totalAmount,
      addItem: AddItemToCartHandler,
      removeItem: removeItemFromCart,
      removeAllUnits: removeAllUnits,
      clearCart: clearCart,
    };
    
    const favoritesContext = {
      items: favorites,
      toggleItem: toggleFavoriteHandler,
    }

  return (
      <>
        <CartContext.Provider value={cartContext}>
        <FavoritesContext.Provider value={favoritesContext}>
            {props.children}
        </FavoritesContext.Provider>
        </CartContext.Provider>
      </>
  )
}

export default ContextProvider;