import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderCartButton from '../Cart/HeaderCartButton';
import classes from './styles/Header.module.css';
import BurgerMenu from '../UI/BurgerMenu';

const Header = () => {
  return (
  <header className={classes.header}>
    <NavLink to='/home' activeClassName={classes.active}><h1>Punk API</h1></NavLink>
    <BurgerMenu>
    <nav className={classes.nav}>
        <ul>
            <div>
            <li><NavLink to='/home' activeClassName={classes.active}><strong>Home</strong></NavLink></li>
            <li><NavLink to='/beers'>Beers</NavLink></li>
            <li><NavLink to='/burgers'>Burgers</NavLink></li>
            <li><NavLink to='/favorites'>Favorites</NavLink></li>
            </div>
            <li><NavLink to='/cart' activeClassName={classes.active}><HeaderCartButton/></NavLink></li>
        </ul>
    </nav>
    </BurgerMenu>

  </header>
  )
}

export default Header