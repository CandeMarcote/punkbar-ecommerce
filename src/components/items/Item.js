import React, { useState, useContext } from 'react';
import classes from './Item.module.css';
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
import CartContext from '../../store/cart-context';
import FavoritesContext from '../../store/favorites-context';

const Item = ({product}) => {
    const cartCtx = useContext(CartContext);
    const favoritesCtx = useContext(FavoritesContext);
    
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
            amount,
        })
    }

    function toggleFavoriteHandler() {
        favoritesCtx.toggleItem({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            ibu: product.ibu,
            abv: product.abv,
            img: product.img,
        })
    }


    
  return (
      <>
        <div className={classes.item}>
            <div onClick={showDetailHandler}>
                <p>{product.name}</p>
                <p>$ {product.price}</p>
                <p>IBU: {product.ibu}</p>
                <p>ABV: {product.abv}</p>
            </div>
            <div>
                <ItemForm onAddToCart={addToCartHandler} />
                <button onClick={toggleFavoriteHandler}>{'<3'}</button>

            </div>
            <div className={classes.imgContainer} onClick={showDetailHandler}>
                <img src={product.img} alt="A delicious beer" />
            </div>
        </div>
        {showDetail && <ItemDetail product={product} onClose={hideDetailHandler}/>}
    </>
  )
}

export default Item