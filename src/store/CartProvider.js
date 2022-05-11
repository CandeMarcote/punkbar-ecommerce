import React, { useState } from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {
  const [productsInCart, setProductsInCart] = useState([]);
  const [productsAmount, setProductsAmount] = useState(0);

  const addItemToCartHandler = item => {
    const existingProductIndex = productsInCart.findIndex((product) => product.id === item.id);
    const existingProduct = productsInCart[existingProductIndex];

    let updatedProducts= undefined;

    if(existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount + item.amount
      };
      updatedProducts = [...productsInCart];
      updatedProducts[existingProductIndex] = updatedProduct
    } else {
      updatedProducts = productsInCart.concat(item)
    }

    setProductsInCart(updatedProducts);
    setProductsAmount(productsInCart.length);
  }

  const removeItemFromCartHandler = id => {
    const existingProductIndex = productsInCart.findIndex((product) => product.id === id);
    const existingProduct = productsInCart[existingProductIndex];

    let updatedProducts = undefined;
    
    if(existingProduct.amount > 1) {
      const updatedProduct = {
        ...existingProduct,
        amount: existingProduct.amount - 1
      }
      updatedProducts = [...productsInCart];
      updatedProducts[existingProductIndex] = updatedProduct;
    } else {
      updatedProducts = productsInCart.filter((product) => product.id !== id)
    }
    setProductsInCart(updatedProducts);
    setProductsAmount(productsInCart.length)
  }

  const cartContext = {
      items: productsInCart,
      totalAmount: productsAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;