import React, { useState, useContext } from 'react';
import classes from './Item.module.css';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
import CartContext from '../../store/cart-context';
import ToggleFavorite from '../favorites/ToggleFavorite';

const Item = ({product}) => {
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
            description: product.description,
            price: product.price,
            ibu: product.ibu,
            abv: product.abv,
            img: product.img,
            type: product.type,
            amount,
        });
    }

  return (
      <>
        {product.type === 'beer' && (
        <div className={classes.item}>
            <div onClick={showDetailHandler}>
                <h4>{product.name}</h4>
                <p>$ {product.price}</p>
                <p>IBU: {product.ibu}</p>
                <p>ABV: {product.abv}</p>
            </div>
            <div className={classes.imgContainer} onClick={showDetailHandler}>
                <img src={product.img} alt="A delicious beer" />
            </div>
        </div>
        )}

        {product.type === 'burger' && (
        <div className={classes.item}>
            <div onClick={showDetailHandler}>
                <h4>{product.name}</h4>
                <p>$ {product.price.toFixed(2)}</p>
            </div>
            <div className={classes.imgContainer} onClick={showDetailHandler}>
                <img src={product.img} alt="Delicious burger" />
            </div>
        </div>
        )}

        <div>
            <ItemForm onAddToCart={addToCartHandler} />
            <ToggleFavorite product={product} favedStatus={product.faved}/>
        </div>
        {showDetail && <ItemDetail product={product} onClose={hideDetailHandler}/>}
    </>
  )
}

export default Item