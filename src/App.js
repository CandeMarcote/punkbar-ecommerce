import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Beers from './pages/Beers';
import Burgers from './pages/Burgers';
import Cart from './pages/Cart';

import Header from './components/layout/Header';
import CartProvider from './store/CartProvider';

const App = () => {

  return (
    <>
      <Header />
      <CartProvider>
      <main>
        <Switch>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Route path='/' exact>
            <Redirect to='/home'/>
          </Route>
          <Route path='/beers'>
            <Beers />
          </Route>
          <Route path='/burgers'>
            <Burgers />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
          <Route path='/*'>
            <Redirect to='/home'/>
          </Route>
        </Switch>
      </main>
      </CartProvider>
    </>
  )
}

export default App