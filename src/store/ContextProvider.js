import { useState, useEffect } from "react";
import CartContext from "./cart-context";
import postRequestData from "../services/postService";
import deleteRequestData from "../services/deleteService";
import getRequestData from "../services/services";
import putRequestData from "../services/putService";

const ContextProvider = (props) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    //const [favorites, setFavorites] = useState([]);
    const theUserId = props.userId;

    useEffect(()=> {
      if(theUserId > -1) {
        //getFavoritesFromDB();
        getCartItemsFromDB();
      }
    }, [theUserId]);
  
    //GET FAVORITES FROM DB
    // let getFavoritesFromDB = async () => {
    //   const url = `http://localhost:8080/favorites/${theUserId}`;
    //   const res = await getRequestData(url);

    //   let beers = []
    //   for (let i = 0; i < res.length; i++) {
    //     const element = res[i];
    //     if(element.category === "beer") {
    //       const response = await getRequestData(`https://api.punkapi.com/v2/beers/${element.productNumber}`);
    //       const transform = response.map(item => {
    //         return {
    //           id: item.id,
    //           name: item.name,
    //           description: item.description,
    //           ibu: item.ibu,
    //           abv: item.abv,
    //           price: item.ph,
    //           img: item.image_url,
    //           type: 'beer',
    //         }
    //       })
    //       beers = beers.concat(transform);
    //     } else {
    //       const response = await getRequestData(`https://my-burger-api.herokuapp.com/burgers/${element.productNumber}`);
    //       const arrayAUX = [];
    //       arrayAUX.push(response)
    //       const transform = arrayAUX.map(item => {
    //         return {
    //           id: item.id,
    //           name: item.name,
    //           ingredients: item.ingredients,
    //           description:item.description,
    //           price: 10,
    //           type: 'burger',
    //           img: "https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/cdn/a503e7eb-0166-4f30-86d6-d276dfcbd3bc/42447522-65cd-428e-ae12-14a2b3754be4_560_420.jpg",
    //       }
    //       })
    //       beers = beers.concat(transform);
    //     }
    //     setFavorites(beers);
    //   }
    // }


    //GET CART ITEMS FROM DATABASE
    let getCartItemsFromDB = async () => {
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
          
        setCartProducts(items);
      }
    }

    
    //ADDING ITEMS TO THE CART
    function AddItemToCartHandler (item) {
      const updatedTotalAmount = totalAmount + item.amount;
      const existingItemIndex = cartProducts.findIndex(element => element.id  === item.id && element.type === item.type);
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
    function removeItemFromCart (id, type) {
      const url = `http://localhost:8080/cartItems/${theUserId}`;
      const updatedTotalAmount = totalAmount - 1
      const existingProductIndex = cartProducts.findIndex((product) => product.id === id && product.type === type);
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

    // REMOVE ALL UNITS OF ONE ITEM
    function removeAllUnits(id, type) {
      const url = `http://localhost:8080/cartItems/${theUserId}`;

      const existingProductIndex = cartProducts.findIndex((product) => product.id === id && product.type === type);
      const existingProduct = cartProducts[existingProductIndex];

      const updatedProducts = cartProducts.filter(product => product !== existingProduct);
      const updatedTotalAmount = totalAmount - 1;

      setCartProducts(updatedProducts);
      setTotalAmount(updatedTotalAmount);
      const theItem = {
        category: existingProduct.type,
        productNumber: existingProduct.id,
      }
      deleteRequestData(url, theItem)
    }

    // CLEAR CART (NO BACKEND)
    function clearCart() {
      const clearCart = [];
      const clearAmount = 0;
      setCartProducts(clearCart);
      setTotalAmount(clearAmount);
    }

    // function clearFavorites() {
    //   const clearFavorites = [];
    //   setFavorites(clearFavorites);
    // }    

    //TOGGLE FAVORITES
    // function toggleFavoriteHandler(item){
    //   const existingItemIndex = favorites.findIndex(element => element.id  === item.id && element.type === item.type);
    //   const existingItem = favorites[existingItemIndex];
    //   let updatedItems = undefined;
      
    //   const theItem = {
    //     productNumber: item.id,
    //     category: item.type,
    //     userId: theUserId,
    //   }
    //   if(!existingItem) {
    //     const url = "http://localhost:8080/favorites/";
        
    //     postRequestData(url, theItem);
    //     updatedItems = [...favorites, item];
    //   } else {
    //     const url = `http://localhost:8080/favorites/${theUserId}`;

    //     const existingItemIndex = favorites.findIndex((element) => element.id === item.id && element.type === item.type);
    //     const existingItem = favorites[existingItemIndex];
    //     deleteRequestData(url, theItem);
    //     updatedItems = favorites.filter(element => element !== existingItem);
    //   }
    //   setFavorites(updatedItems)
    // }
    
    const cartContext = {
      items: cartProducts,
      totalAmount: totalAmount,
      addItem: AddItemToCartHandler,
      removeItem: removeItemFromCart,
      removeAllUnits: removeAllUnits,
      clearCart: clearCart,
    };
    
    // const favoritesContext = {
    //   items: favorites,
    //   toggleItem: toggleFavoriteHandler,
    //   clearFavorites: clearFavorites,
    // }

  return (
      <>
        <CartContext.Provider value={cartContext}>
        {/* <FavoritesContext.Provider value={favoritesContext}> */}
            {props.children}
        {/* </FavoritesContext.Provider> */}
        </CartContext.Provider>
      </>
  )
}

export default ContextProvider;