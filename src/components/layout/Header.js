import React from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import HeaderCartButton from '../Cart/HeaderCartButton';
import classes from './styles/Header.module.css';
import BurgerMenu from '../UI/BurgerMenu';

const Header = (props) => {
  let history = useHistory();

  function loginHandler(){
    props.onLogin(false)
    history.push('/login')
  }

  return (
  <header className={classes.header}>
    <div>
      <NavLink to='/cart' activeClassName={classes.active}><HeaderCartButton/></NavLink>
      <Link to='/home'><h1 className={classes.header__title}>Punk API</h1></Link>
    </div>
    <BurgerMenu>
    <nav className={classes.nav}>
        <ul>
            <div>
              <li><NavLink to='/home' activeClassName={classes.active}><strong>Home</strong></NavLink></li>
              <li><NavLink to='/beers' activeClassName={classes.active}>Beers</NavLink></li>
              <li><NavLink to='/burgers' activeClassName={classes.active}>Burgers</NavLink></li>
              <li><NavLink to='/favorites' activeClassName={classes.active}>Favorites</NavLink></li>
            </div>
            <br />
            <li><button onClick={loginHandler}><p>Log out</p></button></li>
        </ul>
    </nav>
    </BurgerMenu>

  </header>
  )
}

export default Header