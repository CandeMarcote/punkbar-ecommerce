import React, { useContext } from 'react';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.length;
  return (
    <button onClick={props.onShowCart}>
        <div className={classes.cartButton}>
            <div className={classes.cartIcon}></div>
            <div className={classes.cartItemsNumber}>{numberOfCartItems}</div>
        </div>
    </button>
  )
}

export default HeaderCartButton