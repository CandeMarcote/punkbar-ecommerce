import React from 'react';
import Modal from '../UI/Modal';
import ToggleFavorite from '../favorites/ToggleFavorite';

const ItemDetail = ({product, onClose}) => {
  let ingredients;

  if(product.type === 'burger') {
    ingredients = product.ingredients.map(ingredient => {
      return <p key={Math.random()}>{ingredient}</p> 
    })
  }

  return (
    <Modal onClose={onClose}>
        {product.type === 'beer' && (
        <div>
            <h3>{product.name}</h3>
            <img src={product.img} alt="Buzz beer" width='30%'/>
            <p>{product.description}</p>
            <div>
                <p>IBU: {product.ibu}</p>
                <p>ABV: {product.abv}</p>
            </div>
        </div>
        )}
        
        {product.type === 'burger' && (
        <div>
          <h3>{product.name}</h3>
          <img src={product.img} alt="Buzz beer" width='30%'/>
          <div>
            <div>Ingredients: {ingredients}</div>
          </div>
        </div>
        )}
        <ToggleFavorite product={product}/>
    </Modal>
  )
}

export default ItemDetail;