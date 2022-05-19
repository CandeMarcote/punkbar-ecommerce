import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Beers from './pages/Beers';
import Burgers from './pages/Burgers';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Main from './components/layout/Main';

import Header from './components/layout/Header';
import ContextProvider from './store/ContextProvider';
import Login from './pages/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')) || false)

  function loginHandler(logStatus) {
    setIsLoggedIn(logStatus);
  }

  useEffect(()=>{
    localStorage.setItem('isLoggedIn', isLoggedIn)
  })

  return (
    <>
      <ContextProvider>
      <Header onLogin={loginHandler} logStatus={isLoggedIn}/>
      <Main>
        <Switch>
          <Route path='/login'>
            <Login onLogin={loginHandler} logStatus={isLoggedIn}/>
          </Route>

        {!isLoggedIn && <Route path='/*'>
            <Redirect to='/login'/>
          </Route>}
        </Switch>

        {isLoggedIn && (
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
          </Switch>
        )}           
      </Main>
      </ContextProvider>
    </>
  )
}

export default App