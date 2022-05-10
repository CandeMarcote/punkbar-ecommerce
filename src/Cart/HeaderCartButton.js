import React from 'react';
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = () => {
  return (
    <>
        <div className={classes.cartButton}>
            <div className={classes.cartIcon}></div>
            <div className={classes.cartItemsNumber}>3</div>
        </div>
    </>
  )
}

export default HeaderCartButton