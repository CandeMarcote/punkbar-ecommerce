import React, { useState, useContext } from 'react';
import '../../styles/main.css'
import CartContext from '../../store/cart-context';
import ItemDetail from '../items/ItemDetail';

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
      <br />
      <hr />
    <div className='itemContainer' onClick={showDetailHandler}>
        <div>
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
            <div className='add'>
                <button onClick={removeItemHandler}> - </button>
                <p>{product.amount}</p>
                <button onClick={addItemHandler}> + </button>
            </div>
            <div>
                <button onClick={removeAllItemsHandler}>Remove all</button>
            </div>
        </div>
        <div>
            <p className='totalPrice'>$ {(product.amount*product.price).toFixed(2)}</p>
        </div>
    </div>
        {showDetail && <ItemDetail product={product} onClose={hideDetailHandler}/>}
    <hr />
    <br />
    </>
  )
}

export default CartItem