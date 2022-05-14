import React, { useContext } from 'react';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);

    const numberOfItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0)
  return (
    <button onClick={props.onShowCart}>
        <div className={classes.cartButton}>
            <div className={classes.cartIcon}></div>
            <div className={classes.cartItemsNumber}>{numberOfItems}</div>
        </div>
    </button>
  )
}

export default HeaderCartButton