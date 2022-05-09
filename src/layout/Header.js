import React from 'react';
import Nav from './Nav';

import classes from './styles/Header.module.css';

const Header = () => {
  return (
  <header className={classes.header}>
      <div>Logo</div>
      <h1>Punk API</h1>
      <Nav />
  </header>
  )
}

export default Header