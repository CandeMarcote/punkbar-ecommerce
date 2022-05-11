import React from 'react';
import Nav from './Nav';
import HeaderCartButton from '../Cart/HeaderCartButton';
import classes from './styles/Header.module.css';

const Header = (props) => {
  return (
  <header className={classes.header}>
      <div>Logo</div>
      <h1>Punk API</h1>
      <Nav />
      <HeaderCartButton onShowCart={props.onShowCart}/>
  </header>
  )
}

export default Header