import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Beers from './pages/Beers';
import Burgers from './pages/Burgers';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';

import Header from './components/layout/Header';
import ContextProvider from './store/ContextProvider';

const App = () => {

  return (
    <>
      <ContextProvider>
      <Header />
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
          <Route path='/favorites'>
            <Favorites />
          </Route>
          <Route path='/*'>
            <Redirect to='/home'/>
          </Route>
        </Switch>
      </main>
      </ContextProvider>
    </>
  )
}

export default App