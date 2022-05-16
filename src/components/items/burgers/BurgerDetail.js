import React from 'react';
import Modal from '../../UI/Modal';
import ToggleFavorite from '../../favorites/ToggleFavorite';

const BurgerDetail = ({product, onClose}) => {
    const ingredients = product.ingredients.map(ingredient => {
        return <p key={Math.random()}>{ingredient}</p> 
    })
  return (
    <Modal onClose={onClose}>
        <div>
            <h3>{product.name}</h3>
            <img src={product.img} alt="Buzz beer" width='30%'/>
            <div>
                <div>Ingredients: {ingredients}</div>
            </div>
            <ToggleFavorite product={product}/>
        </div>
    </Modal>
  )
}

export default BurgerDetail