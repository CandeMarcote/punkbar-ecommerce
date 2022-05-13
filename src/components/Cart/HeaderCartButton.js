import React, { useContext } from 'react';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfItems = cartCtx.items.length
  console.log(numberOfItems)

  return (
    <button>
        <div className={classes.cartButton}>
            <div className={classes.cartIcon}></div>
            <div className={classes.cartItemsNumber}>{1}</div>
        </div>
    </button>
  )
}

export default HeaderCartButton