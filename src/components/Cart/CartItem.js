import React, { useContext } from 'react';
import classes from './CartItem.module.css';
import CartContext from '../../store/cart-context';

const CartItem = ({product}) => {
    const cartCtx = useContext(CartContext);

    function removeItemHandler() {
        cartCtx.removeItem(product.id)
    }

    function addItemHandler() {
        cartCtx.addItem({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            ibu: product.ibu,
            abv: product.abv,
            img: product.img,
            amount: 1,
        })
    }

  return (
    <div className={classes.itemContainer}>
        <div>
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
            <div className={classes.add}>
                <button onClick={removeItemHandler}> - </button>
                <p>{product.amount}</p>
                <button onClick={addItemHandler}> + </button>
            </div>
        </div>
        <div>
            <p className={classes.totalPrice}>$ {(product.amount*product.price).toFixed(2)}</p>
        </div>
    </div>
  )
}

export default CartItem