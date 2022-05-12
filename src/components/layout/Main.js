import React from 'react';
import classes from './styles/Main.module.css';
import ItemListContainer from '../items/ItemListContainer';

const Main = () => {
  return (
    <main className={classes.main}>
        <ItemListContainer />
    </main>
  )
}

export default Main