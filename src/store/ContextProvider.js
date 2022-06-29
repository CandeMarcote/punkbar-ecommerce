import { useState, useEffect } from "react";
import CartContext from "./cart-context";
import FavoritesContext from "./favorites-context";
import postRequestData from "../services/postService";
import deleteRequestData from "../services/deleteService";
import getRequestData from "../services/services";
import putRequestData from "../services/putService";

const ContextProvider = (props) => {
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cartProducts')) || []);
    const [totalAmount, setTotalAmount] = useState(0);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const theUserId = props.userId;

    useEffect(()=> {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      localStorage.setItem('favorites', JSON.stringify(favorites));
      //getFetch();
    }, [cartProducts, favorites]);

    //GET ITEMS FROM DB
    /*let getFetch = async () => {
      const url = `http://localhost:8080/cartItems/all?userId=${theUserId}`;
      const res = await getRequestData(url);
      setCartProducts(res);
    }*/
    
    //ADDING ITEMS TO THE CART
    function AddItemToCartHandler (item) {
      const updatedTotalAmount = totalAmount + item.amount;
      const existingItemIndex = cartProducts.findIndex(element => element.id === item.id);
      const existingItem = cartProducts[existingItemIndex];
      let updatedItems = undefined;

      const url = `http://localhost:8080/cartItems/${theUserId}`;
        if(existingItem) {
          const updatedItem = {
            ...existingItem,
                amount: existingItem.amount + item.amount
              };
              updatedItems = [...cartProducts];
              updatedItems[existingItemIndex] = updatedItem;
              const theItem={
                category: updatedItem.type,
                productNumber: updatedItem.id,
                amount: updatedItem.amount
              }
              putRequestData(url, theItem);
        } else {
          updatedItems = cartProducts.concat(item);
          const theItem = {
            category: item.type,
            productNumber: item.id,
            amount: item.amount
          }
          postRequestData(url, theItem);
       }
      
      setCartProducts(updatedItems)
      setTotalAmount(updatedTotalAmount)
    }
    //REMOVING ITEMS FROM THE CART
    function removeItemFromCart (id) {
      const url = `http://localhost:8080/cartItems/${theUserId}`;
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
          const theItem = {
            category: updatedProduct.type,
            productNumber: updatedProduct.id,
            amount: updatedProduct.amount
          }
          putRequestData(url, theItem);
      } else {
        updatedProducts = cartProducts.filter((product) => product.id !== id);
        const theItem = {
          category: existingProduct.type,
          productNumber: existingProduct.id,
          amount: existingProduct.amount
        }
        deleteRequestData(url, theItem)
      }
      setCartProducts(updatedProducts);
      setTotalAmount(updatedTotalAmount)
    }

    function removeAllUnits(id) {
      const url = `http://localhost:8080/cartItems/${theUserId}`;
      const updatedProducts = cartProducts.filter((product) => product.id !== id);
      const updatedTotalAmount = totalAmount - 1;

      const existingProductIndex = cartProducts.findIndex((product) => product.id === id);
      const existingProduct = cartProducts[existingProductIndex];
      setCartProducts(updatedProducts);
      setTotalAmount(updatedTotalAmount);
      const theItem = {
        category: existingProduct.type,
        productNumber: existingProduct.id,
        amount: existingProduct.amount
      }
      deleteRequestData(url, theItem)
    }

    function clearCart() {
      const clearCart = [];
      const clearAmount = 0;
      setCartProducts(clearCart);
      setTotalAmount(clearAmount);
      deleteRequestData(`http://localhost:8080/cartItems/deleteAll`);
    }

    function clearFavorites() {
      const clearFavorites = [];
      const clearAmount = 0;
      setFavorites(clearFavorites);
    }    

    //TOGGLE FAVORITES
    function toggleFavoriteHandler(item){
      const existingItemIndex = favorites.findIndex(element => element.id === item.id);
      const existingItem = favorites[existingItemIndex];
      let updatedItems = undefined;
      
      const theItem = {
        productNumber: item.id,
        category: item.type,
        userId: theUserId,
      }
      if(!existingItem) {
        const url = "http://localhost:8080/favorites/";
        
        postRequestData(url, theItem);
        updatedItems = [...favorites, item];
      } else {
        const url = `http://localhost:8080/favorites/${theUserId}`;
        deleteRequestData(url, theItem);
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
      clearFavorites: clearFavorites,
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