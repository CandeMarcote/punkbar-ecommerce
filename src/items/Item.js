import React, { useState } from 'react';
import classes from './Item.module.css';
import ItemDetail from './ItemDetail';

const Item = ({product}) => {
    const [showDetail, setShowDetail] = useState(false);
    
    function showDetailHandler() {
        setShowDetail(true);
    }

    function hideDetailHandler() {
        setShowDetail(false);
    }

    function addToCart() {
        
    }
    
  return (
      <>
        <div className={classes.item} onClick={showDetailHandler}>
            <div>
                <p>{product.name}</p>
                <p>$ {product.price}</p>
                <p>IBU: {product.ibu}</p>
                <p>ABV: {product.abv}</p>
                <button onClick={addToCart}>Add to Cart</button>
            </div>
            <div className={classes.imgContainer}>
                <img src={product.img} alt="A delicious beer" />
            </div>
        </div>
        {showDetail && <ItemDetail product={product} onClose={hideDetailHandler}/>}
    </>
  )
}

export default Item