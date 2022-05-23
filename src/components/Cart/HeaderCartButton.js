import React, { useContext } from 'react';
import '../../styles/header.css';
import CartContext from '../../store/cart-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);

    const numberOfItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0)

  return (
    <button  className='cartButton'>
        <div>
            <FontAwesomeIcon icon={faCartShopping} className='cartIcon'/>
            <div className='cartItemsNumber'>{numberOfItems}</div>
        </div>
    </button>
  )
}

export default HeaderCartButton