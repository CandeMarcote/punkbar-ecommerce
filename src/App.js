import React, { useState, useContext } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Cart from './Cart/Cart';
import CartProvider from './store/CartProvider';
import CartContext from './store/cart-context';

const App = () => {
  const [showCart, setShowCart] = useState(false);

  function showCartHandler() {
    setShowCart(true);
  }

  function hideCartHandler() {
    setShowCart(false)
  }

  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <Main />
    </CartProvider>
  )
}

export default App