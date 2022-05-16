import React, { useContext, useState } from 'react';
import ItemForm from '../ItemForm';
import ToggleFavorite from '../../favorites/ToggleFavorite';
import BurgerDetail from './BurgerDetail';
import classes from '../Item.module.css';
import CartContext from '../../../store/cart-context';

const BurgerItem = ({product}) => {
    const cartCtx = useContext(CartContext);
    const [showDetail, setShowDetail] = useState(false);

    function showDetailHandler() {
        setShowDetail(true);
    }

    function hideDetailHandler() {
        setShowDetail(false);
    }

    function addToCartHandler(amount) {
        cartCtx.addItem({
            id: product.id,
            name: product.name,
            ingredients: product.ingredients,
            price: product.price,
            img: product.img,
            type: product.type,
            amount,
        })
    }

  return (
    <div className={classes.item}>
        <div onClick={showDetailHandler}>
            <h4>{product.name}</h4>
            <p>$ {product.price.toFixed(2)}</p>
        </div>
        <div>
            <ItemForm onAddToCart={addToCartHandler} />
            <ToggleFavorite product={product}/>
        </div>
        <div>
            <div className={classes.imgContainer}  onClick={showDetailHandler}>
                <img src={product.img} alt="Delicious burger" />
            </div>
        </div>
        {showDetail && <BurgerDetail product={product} onClose={hideDetailHandler}/> }
    </div>
  )
}

export default BurgerItem