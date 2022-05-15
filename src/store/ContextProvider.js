import { useState, useEffect } from "react";
import CartContext from "./cart-context";
import FavoritesContext from "./favorites-context";

const ContextProvider = (props) => {
    const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem('cartProducts')) || []);
    const [totalAmount, setTotalAmount] = useState(0);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

    useEffect(()=> {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [cartProducts, favorites])

    
    
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
      
      function toggleFavoriteHandler(item){
        const existingItemIndex = favorites.findIndex(element => element.id === item.id);
        const existingItem = favorites[existingItemIndex];
        let updatedItems = undefined;
        
        if(!existingItem) {
          updatedItems = [...favorites, item];
          
        } else {
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