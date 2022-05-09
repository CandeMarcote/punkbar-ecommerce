import React from 'react';
import classes from './styles/Nav.module.css';

const Nav = () => {
  return (
    <nav className={classes.nav}>
        <ul>
            <li>Beers</li>
            <li>Burgers</li>
            <li>Cart</li>
        </ul>
    </nav>
  )
}

export default Nav