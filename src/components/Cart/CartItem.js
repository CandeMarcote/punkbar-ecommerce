import React, { useState, useContext } from 'react';
import '../../styles/main.css'
import CartContext from '../../store/cart-context';
import ItemDetail from '../items/ItemDetail';
import '../../styles/cartItems.css'

const CartItem = ({product}) => {
    const cartCtx = useContext(CartContext);
    const [showDetail, setShowDetail] = useState(false);
    
    function hideDetailHandler() {
        setShowDetail(false)
    }

    function showDetailHandler(e) {
        setShowDetail(true);
    }

    function removeItemHandler(e) {
        e.stopPropagation();
        cartCtx.removeItem(product.id)
    }

    function addItemHandler(e) {
        e.stopPropagation();

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

    function removeAllItemsHandler(){
        cartCtx.removeAllUnits(product.id)
    }

  return (
      <>
    <div className='cartItemsContainer' onClick={showDetailHandler}>
        <div className='cartItemInfo'>
            <div className="cartImgContainer">
                <img src={product.img} />
            </div>
            <h4>{product.name}</h4>
            <p className='price'>${product.price.toFixed(2)}</p>
        </div>

        <div className='itemsNumber'>
            <p className='totalPrice'>$ {(product.amount*product.price).toFixed(2)}</p>
            <div className='addItem'>
                <button onClick={removeItemHandler}> - </button>
                <p>{product.amount}</p>
                <button onClick={addItemHandler}> + </button>
            </div>
            <div>
                <button onClick={removeAllItemsHandler}>Remove all</button>
            </div>
        </div>
    </div>
        {showDetail && <ItemDetail product={product} onClose={hideDetailHandler}/>}
    </>
  )
}

export default CartItem