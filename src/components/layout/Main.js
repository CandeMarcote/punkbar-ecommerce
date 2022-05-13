import React from 'react';
import classes from './styles/Main.module.css';
import ItemListContainer from '../items/ItemListContainer';

const Main = () => {
  return (
    <div className={classes.main}>
        <ItemListContainer />
    </div>
  )
}

export default Main