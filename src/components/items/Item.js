import React, { useState, useContext , useEffect} from 'react';
/* import classes from './Item.module.css'; */
import ItemDetail from './ItemDetail';
import ItemForm from './ItemForm';
import CartContext from '../../store/cart-context';
import ToggleFavorite from '../favorites/ToggleFavorite';
import '../../styles/item.css';

const Item = ({product}) => {
    const cartCtx = useContext(CartContext);    
    const [showDetail, setShowDetail] = useState(false);
    
        function hideDetailHandler() {
            setShowDetail(false);
            document.body.classList.remove('noscroll');
        }
    
    function showDetailHandler() {
        setShowDetail(true);
        document.body.classList.add('noscroll');
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
            ingredients: product.ingredients,
            amount,
        });
    }


  return (

    <div className='item'>
        <div className="favoriteToggle">
            <ToggleFavorite product={product} favedStatus={product.faved}/>
        </div>
        {product.type === 'beer' && (
            <div className='beer__item'>

            <div className='imgContainer' onClick={showDetailHandler}>
                <img src={product.img} alt="A delicious beer" />
            </div>
            <div className='item_name' >
                <h4>{product.name}</h4>
                <p>$ {product.price}</p>
                <p>IBU: {product.ibu}</p>
                <p>ABV: {product.abv}</p>
            </div>
            </div>
        )}

        {product.type === 'burger' && (
            <div className='burger__item'>
            <div onClick={showDetailHandler}>
                <h4>{product.name}</h4>
                <p>$ {product.price.toFixed(2)}</p>
            </div>
            <div className='imgContainer' onClick={showDetailHandler}>
                <img src={product.img} alt="Delicious burger" />
            </div>
            </div>
        )}

        <div className='item_add'>
            <ItemForm onAddToCart={addToCartHandler} />
        </div>
        {showDetail && <ItemDetail product={product} onClose={hideDetailHandler}/>}
  </div>
  )
}

export default Item