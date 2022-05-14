import { useState } from "react";
import CartContext from "./cart-context";

const ContextProvider = (props) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);


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
        const updatedTotalAmount = totalAmount - 1.
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

    const context ={
        items: cartProducts,
        totalAmount: totalAmount,
        addItem: AddItemToCartHandler,
        removeItem: removeItemFromCart,
    };

  return (
    <CartContext.Provider value={context}>
        {props.children}
    </CartContext.Provider>
  )
}

export default ContextProvider;