import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderCartButton from '../Cart/HeaderCartButton';
import classes from './styles/Header.module.css';

const Header = (props) => {
  return (
  <header className={classes.header}>
    <NavLink to='/home' activeClassName={classes.active}><div>Logo</div></NavLink>
    <NavLink to='/home' activeClassName={classes.active}><h1>Punk API</h1></NavLink>
    <nav className={classes.nav}>
        <ul>
            <div>
            <li><NavLink to='/beers'>Beers</NavLink></li>
            <li><NavLink to='/burgers'>Burgers</NavLink></li>
            </div>
            <li><NavLink to='/cart' activeClassName={classes.active}><HeaderCartButton onShowCart={props.onShowCart}/></NavLink></li>
        </ul>
    </nav>
  </header>
  )
}

export default Header